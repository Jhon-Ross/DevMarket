import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { sanityClient } from '@devmarket/sanity';

export async function POST(request: Request) {
  try {
    if (!process.env.SANITY_PROJECT_ID) {
      return NextResponse.json({ ok: false, error: 'sanity_env_missing' }, { status: 503 });
    }
    if (!process.env.SANITY_TOKEN) {
      return NextResponse.json({ ok: false, error: 'sanity_write_token_missing' }, { status: 403 });
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
    }

    const form = await request.formData().catch(() => null);
    const file = form?.get('file');
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ ok: false, error: 'invalid_file' }, { status: 400 });
    }

    let asset: any;
    try {
      asset = await sanityClient.assets.upload('image', file, {
        filename: file.name || 'hero.jpg',
      });
    } catch (err: any) {
      const msg = typeof err?.message === 'string' ? err.message : '';
      const status = (err?.statusCode as number) || (err?.response?.statusCode as number) || 500;
      if (status === 401 || /Unauthorized|permission/i.test(msg)) {
        return NextResponse.json({ ok: false, error: 'sanity_unauthorized' }, { status: 403 });
      }
      console.error('[hero.upload] error:', err);
      return NextResponse.json({ ok: false, error: 'internal_error' }, { status: 500 });
    }

    // Vincula o asset ao documento do usuário como campo image (heroImage)
    const id = `userProfile-${session.user.id}`;
    const slug = (session.user.email || 'user')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    // Buscar o slug atual do documento para revalidar a rota correta
    let currentSlug: string | null = null;
    try {
      const s = await sanityClient.fetch<{ slug?: string | null } | null>(
        `*[_type == "userProfile" && _id == $id][0]{ "slug": slug.current }`,
        { id }
      );
      currentSlug = (s?.slug || null);
    } catch {}
    try {
      await sanityClient
        .patch(id)
        .set({
          heroImage: {
            _type: 'image',
            asset: { _type: 'reference', _ref: asset?._id },
          },
          // Garante que o documento tenha slug para ser encontrado pela página pública
          slug: { _type: 'slug', current: slug },
        })
        .unset(['heroUrl'])
        .commit();
    } catch (err: any) {
      const msg = typeof err?.message === 'string' ? err.message : '';
      const status = (err?.statusCode as number) || (err?.response?.statusCode as number) || 500;
      if (status === 401 || /Unauthorized|permission/i.test(msg)) {
        return NextResponse.json({ ok: false, error: 'sanity_unauthorized' }, { status: 403 });
      }
      console.error('[hero.patch] error:', err);
      return NextResponse.json({ ok: false, error: 'internal_error' }, { status: 500 });
    }

    // Se houver outros documentos com o mesmo slug, sincroniza a capa neles também (evita duplicatas divergentes)
    try {
      const ids = await sanityClient.fetch<string[] | null>(
        `*[_type == "userProfile" && slug.current == $slug]._id`,
        { slug }
      );
      const uniqueIds = Array.isArray(ids)
        ? Array.from(new Set(ids.concat(id)))
        : [id];
      await Promise.all(
        uniqueIds.map((docId) =>
          sanityClient
            .patch(docId)
            .set({
              heroImage: { _type: 'image', asset: { _type: 'reference', _ref: asset?._id } },
            })
            .unset(['heroUrl'])
            .commit()
        )
      );
    } catch (err) {
      console.warn('[hero.syncBySlug] fallback sync error:', err);
    }

    // Revalida a página pública para refletir imediatamente a nova capa
    try {
      const path = (currentSlug || slug) ? `/perfil/${currentSlug || slug}` : undefined;
      if (path) revalidatePath(path);
    } catch {}

    return NextResponse.json({ ok: true, assetId: asset?._id, url: asset?.url, slug: currentSlug });
  } catch {
    return NextResponse.json({ ok: false, error: 'internal_error' }, { status: 500 });
  }
}