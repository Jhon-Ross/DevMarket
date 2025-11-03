import { revalidatePath } from "next/cache";

type WebhookPayload = {
  _type?: string;
  slug?: string;
};

export async function POST(req: Request) {
  try {
    // Secret opcional via query string, ex.: /api/webhooks/sanity?secret=... (configure no Sanity)
    const url = new URL(req.url);
    const secretParam = url.searchParams.get("secret");
    const expectedSecret = process.env.SANITY_WEBHOOK_SECRET;
    if (expectedSecret && secretParam !== expectedSecret) {
      return new Response(JSON.stringify({ ok: false, error: "invalid secret" }), { status: 401 });
    }

    const body = (await req.json()) as WebhookPayload;
    const slug = body.slug;

    if (!slug) {
      return new Response(JSON.stringify({ ok: false, error: "missing slug" }), { status: 400 });
    }

    revalidatePath(`/perfil/${slug}`);

    return Response.json({ ok: true, revalidated: `/perfil/${slug}` });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: (err as Error).message }), { status: 500 });
  }
}