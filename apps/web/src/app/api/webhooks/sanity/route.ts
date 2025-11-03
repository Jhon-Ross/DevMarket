import { revalidatePath } from 'next/cache';

function json(res: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(res), {
    headers: { 'content-type': 'application/json' },
    ...init,
  });
}

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const secret = url.searchParams.get('secret');
    const expected = process.env.SANITY_WEBHOOK_SECRET;

    if (expected && secret !== expected) {
      return json({ ok: false, error: 'invalid secret' }, { status: 401 });
    }

    const body = (await request.json().catch(() => null)) as {
      _type?: string;
      slug?: string;
    } | null;
    if (!body || typeof body !== 'object') {
      return json({ ok: false, error: 'invalid body' }, { status: 400 });
    }

    const type = body?._type;
    const slug = body?.slug;

    if (!slug) {
      return json({ ok: false, error: 'missing slug' }, { status: 400 });
    }

    if (type === 'userProfile' || type === 'project') {
      // Para project, revalidamos a página do owner (perfil)
      revalidatePath(`/perfil/${slug}`);
    }

    return json({ ok: true, revalidated: true, target: `/perfil/${slug}` });
  } catch {
    return json({ ok: false, error: 'internal error' }, { status: 500 });
  }
}
