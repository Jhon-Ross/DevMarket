import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { sanityClient } from '@devmarket/sanity';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
    }
    const id = `userProfile-${session.user.id}`;
    const doc = await sanityClient.getDocument(id);
    if (!doc) return NextResponse.json({ ok: true, profile: null });
    const profile = {
      name: (doc as any).name || null,
      bio: (doc as any).bio || null,
      avatarUrl: (doc as any).avatar?.asset?._ref ? undefined : (doc as any).avatarUrl || null,
      skills: (doc as any).skills || [],
      links: (doc as any).links || [],
      slug: (doc as any).slug?.current || null,
    };
    return NextResponse.json({ ok: true, profile });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'internal_error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
    }
    const body = (await req.json().catch(() => null)) as {
      name?: string;
      bio?: string;
      avatarUrl?: string;
      skills?: string[];
      links?: { title: string; url: string; type?: string }[];
    } | null;
    if (!body) {
      return NextResponse.json({ ok: false, error: 'invalid_body' }, { status: 400 });
    }

    const id = `userProfile-${session.user.id}`;
    const slug = (session.user.email || 'user')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const doc = {
      _id: id,
      _type: 'userProfile',
      name: body.name || null,
      bio: body.bio || null,
      slug: { _type: 'slug', current: slug },
      skills: Array.isArray(body.skills) ? body.skills : [],
      links: Array.isArray(body.links) ? body.links : [],
      // avatar: armazenar URL simples; em evolução, trocar para asset upload
      avatarUrl: body.avatarUrl || null,
    };

    const saved = await sanityClient.createOrReplace(doc);

    return NextResponse.json({ ok: true, profileId: saved._id, slug });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'internal_error' }, { status: 500 });
  }
}