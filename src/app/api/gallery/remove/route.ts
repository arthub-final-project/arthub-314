/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    const session = await getServerSession({ req, ...authOptions });

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const item = await prisma.galleryItem.findUnique({ where: { id } });
    if (!item || item.userId !== user.id) {
      return NextResponse.json({ error: 'Not authorized or item not found' }, { status: 403 });
    }

    await prisma.galleryItem.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting artwork:', error);
    return NextResponse.json({ error: 'Failed to delete artwork' }, { status: 500 });
  }
}
