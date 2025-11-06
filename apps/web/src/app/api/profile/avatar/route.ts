import { NextResponse } from 'next/server';
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
        filename: file.name || 'avatar.jpg',
      });
    } catch (err: any) {
      const msg = typeof err?.message === 'string' ? err.message : '';
      const status = (err?.statusCode as number) || (err?.response?.statusCode as number) || 500;
      if (status === 401 || /Unauthorized|permission/i.test(msg)) {
        return NextResponse.json({ ok: false, error: 'sanity_unauthorized' }, { status: 403 });
      }
      console.error('[avatar.upload] error:', err);
      return NextResponse.json({ ok: false, error: 'internal_error' }, { status: 500 });
    }

    // Vincula o asset ao documento do usuário como campo image (avatar)
    const id = `userProfile-${session.user.id}`;
    try {
      await sanityClient
        .patch(id)
        .set({
          avatar: {
            _type: 'image',
            asset: { _type: 'reference', _ref: asset?._id },
          },
        })
        .unset(['avatarUrl'])
        .commit();
    } catch (err: any) {
      const msg = typeof err?.message === 'string' ? err.message : '';
      const status = (err?.statusCode as number) || (err?.response?.statusCode as number) || 500;
      if (status === 401 || /Unauthorized|permission/i.test(msg)) {
        return NextResponse.json({ ok: false, error: 'sanity_unauthorized' }, { status: 403 });
      }
      console.error('[avatar.patch] error:', err);
      return NextResponse.json({ ok: false, error: 'internal_error' }, { status: 500 });
    }

    return NextResponse.json({ ok: true, assetId: asset?._id, url: asset?.url });
  } catch {
    return NextResponse.json({ ok: false, error: 'internal_error' }, { status: 500 });
  }
}