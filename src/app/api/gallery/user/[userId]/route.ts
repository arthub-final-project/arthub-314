/* eslint-disable import/prefer-default-export */

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;
  const numericUserId = parseInt(userId, 10);
  if (Number.isNaN(numericUserId)) {
    return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
  }
  try {
    const items = await prisma.galleryItem.findMany({
      where: { userId: numericUserId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        imageUrl: true,
        user: { select: { id: true, email: true } },
      },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json({ error: 'Failed to load gallery' }, { status: 500 });
  }
}
