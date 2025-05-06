/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      take: 3,
      where: {
        profile: { isNot: null },
        galleryItems: { some: {} },
      },
      include: {
        profile: true,
        galleryItems: true,
      },
    });

    return NextResponse.json(users);
  } catch (err: any) {
    console.error('❌ API /featured failed:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
