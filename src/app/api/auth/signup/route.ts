/* eslint-disable import/prefer-default-export */
import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const POST = async function (req: Request) {
  const { email, password, role } = await req.json();

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json({ success: false, error: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role || 'Collector',
      },
    });

    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (err) {
    console.error('[Signup API] Error creating user:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
};
