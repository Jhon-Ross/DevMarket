import { NextResponse } from 'next/server';
import { sanityClient, userProfileBySlugQuery } from '@devmarket/sanity';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const profile = await sanityClient.fetch(userProfileBySlugQuery, { slug });
    return NextResponse.json({ ok: true, slug, profile });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || 'fetch_error' }, { status: 500 });
  }
}