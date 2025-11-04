import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as {
      name?: string;
      email?: string;
      password?: string;
    } | null;
    if (!body || !body.email || !body.password) {
      return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 });
    }

    const email = body.email.trim().toLowerCase();
    const name = (body.name || '').trim();

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json({ ok: false, error: 'email_taken' }, { status: 409 });
    }

    const hash = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name: name || null,
        password: hash,
      },
      select: { id: true, email: true, name: true },
    });

    return NextResponse.json({ ok: true, user });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'internal_error' }, { status: 500 });
  }
}
