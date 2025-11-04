import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { sanityClient } from '@devmarket/sanity';

function slugify(input: string) {
  const base = input
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 48);
  const rand = Math.random().toString(36).slice(2, 8);
  return `${base}-${rand}`;
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
    }

    const body = (await req.json().catch(() => null)) as {
      title?: string;
      description?: string;
      techTags?: string[];
      coverUrl?: string;
    } | null;

    if (!body || !body.title) {
      return NextResponse.json({ ok: false, error: 'missing_title' }, { status: 400 });
    }

    const ownerId = `userProfile-${session.user.id}`;
    const slug = slugify(body.title);

    const doc = {
      _type: 'project',
      title: body.title,
      description: body.description || null,
      techTags: Array.isArray(body.techTags) ? body.techTags : [],
      slug: { _type: 'slug', current: slug },
      status: 'pending',
      isPublic: false,
      owner: { _type: 'reference', _ref: ownerId },
      coverImage: body.coverUrl
        ? { _type: 'image', asset: { _type: 'reference', _ref: body.coverUrl } }
        : null,
    } as const;

    // Para URL direta de imagem (não asset id), salvamos em campo auxiliar
    if (body.coverUrl && body.coverUrl.startsWith('http')) {
      (doc as any).coverUrl = body.coverUrl;
    }

    const created = await sanityClient.create(doc);

    return NextResponse.json({ ok: true, projectId: created._id, slug, ownerId });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'internal_error' }, { status: 500 });
  }
}