/* eslint-disable import/prefer-default-export */
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  try {
    const items = await prisma.galleryItem.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        imageUrl: true,
        user: {
          select: {
            email: true,
          },
        },
      },
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching user gallery items:', error);
    return NextResponse.json({ error: 'Failed to load gallery' }, { status: 500 });
  }
}
