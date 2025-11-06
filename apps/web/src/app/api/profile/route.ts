import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { sanityClient } from '@devmarket/sanity';
import { profileSchema } from '@/app/perfil/meu/schema';

export async function GET() {
  try {
    // Se o Sanity não está configurado no ambiente, evite crash e retorne vazio
    if (!process.env.SANITY_PROJECT_ID) {
      return NextResponse.json({ ok: true, profile: null });
    }
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
    }
    const id = `userProfile-${session.user.id}`;
    const doc = await sanityClient.fetch<{
      name?: string;
      bio?: string;
      tagline?: string;
      avatarUrl?: string | null;
      heroUrl?: string | null;
      skills?: string[];
      links?: { title: string; url: string; type?: string }[];
      customization?: any;
      experience?: any[];
      testimonials?: any[];
      slug?: string | null;
    } | null>(
      `*[_type == "userProfile" && _id == $id][0]{
        name,
        bio,
        tagline,
        "avatarUrl": avatar.asset->url,
        "heroUrl": heroImage.asset->url,
        skills,
        links,
        customization{ theme, layout, sections },
        experience[]{ role, company, startDate, endDate, description },
        testimonials[]{ author, quote, "avatarUrl": avatar.asset->url },
        "slug": slug.current
      }`,
      { id }
    );
    if (!doc) return NextResponse.json({ ok: true, profile: null });
    const profile = {
      name: doc.name || null,
      bio: doc.bio || null,
      tagline: doc.tagline || null,
      avatarUrl: doc.avatarUrl || null,
      heroUrl: doc.heroUrl || null,
      skills: doc.skills || [],
      links: doc.links || [],
      customization: doc.customization || null,
      experience: Array.isArray(doc.experience) ? doc.experience : [],
      testimonials: Array.isArray(doc.testimonials) ? doc.testimonials : [],
      slug: doc.slug || null,
    };
    return NextResponse.json({ ok: true, profile });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'internal_error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    // Pré‑checagens para fornecer erros claros de configuração
    if (!process.env.SANITY_PROJECT_ID) {
      return NextResponse.json({ ok: false, error: 'sanity_env_missing' }, { status: 503 });
    }
    if (!process.env.SANITY_TOKEN) {
      // Token somente leitura (ex.: SANITY_API_READ_TOKEN) não consegue gravar
      return NextResponse.json({ ok: false, error: 'sanity_write_token_missing' }, { status: 403 });
    }
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
    }
    const body = (await req.json().catch(() => null)) as {
      name?: string;
      bio?: string;
      tagline?: string;
      customization?: { theme?: { primaryColor?: string; backgroundColor?: string; textColor?: string; accentColor?: string }; layout?: string; sections?: { [k: string]: boolean } };
      skills?: string[];
      links?: { title: string; url: string; type?: string }[];
    } | null;
    if (!body) {
      return NextResponse.json({ ok: false, error: 'invalid_body' }, { status: 400 });
    }

    // Normalize and validate with Zod for server-side safety
    const candidate = {
      name: (body.name || '').trim(),
      bio: (body.bio || '').trim(),
      tagline: (body.tagline || '').trim(),
      customization: body.customization || {},
      skills: Array.isArray(body.skills) ? body.skills.map((s) => s.trim()).filter(Boolean) : [],
      links: Array.isArray(body.links)
        ? body.links.map((l) => ({
            title: (l.title || '').trim(),
            url: (l.url || '').trim(),
            type: l.type ? l.type.trim() : undefined,
          }))
        : [],
    };

    const parsed = profileSchema.safeParse(candidate);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: 'invalid_body' }, { status: 400 });
    }
    const value = parsed.data;

    const id = `userProfile-${session.user.id}`;
    const slug = (session.user.email || 'user')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Ensure document exists without wiping existing asset fields (e.g., avatar, heroImage)
    try {
      await sanityClient.createIfNotExists({ _id: id, _type: 'userProfile', slug: { _type: 'slug', current: slug } });
    } catch (err: any) {
      const msg = typeof err?.message === 'string' ? err.message : '';
      const status = (err?.statusCode as number) || (err?.response?.statusCode as number) || 500;
      if (status === 401 || /Unauthorized|permission/i.test(msg)) {
        return NextResponse.json({ ok: false, error: 'sanity_unauthorized' }, { status: 403 });
      }
      console.error('[profile.put] createIfNotExists_error:', err);
      return NextResponse.json({ ok: false, error: 'internal_error' }, { status: 500 });
    }

    let saved: any;
    try {
      saved = await sanityClient
        .patch(id)
        .set({
          name: value.name || null,
          bio: value.bio || null,
          tagline: value.tagline || null,
          customization: value.customization || null,
          slug: { _type: 'slug', current: slug },
          skills: Array.isArray(value.skills) ? value.skills : [],
          links: Array.isArray(value.links) ? value.links : [],
        })
        .commit();
    } catch (err: any) {
      const msg = typeof err?.message === 'string' ? err.message : '';
      const status = (err?.statusCode as number) || (err?.response?.statusCode as number) || 500;
      if (status === 401 || /Unauthorized|permission/i.test(msg)) {
        return NextResponse.json({ ok: false, error: 'sanity_unauthorized' }, { status: 403 });
      }
      console.error('[profile.put] patch_error:', err);
      return NextResponse.json({ ok: false, error: 'internal_error' }, { status: 500 });
    }

    // Revalidate the public profile page so changes reflect promptly
    try {
      revalidatePath(`/perfil/${slug}`);
    } catch {}

    return NextResponse.json({ ok: true, profileId: saved._id, slug });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'internal_error' }, { status: 500 });
  }
}