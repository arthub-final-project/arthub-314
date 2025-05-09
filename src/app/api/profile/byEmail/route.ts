/* eslint-disable import/prefer-default-export */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        profile: { select: { id: true } },
      },
    });

    if (!user?.profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json(user.profile);
  } catch (error) {
    console.error('Failed to fetch profile by email:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
