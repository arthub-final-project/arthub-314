/* eslint-disable import/prefer-default-export */

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    return NextResponse.json({ userId: user.id });
  } catch (error) {
    console.error('Error fetching user ID:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
