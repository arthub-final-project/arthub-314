/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';

export async function DELETE(req: NextRequest) {
  const { id, userId } = await req.json();
  // Proceed with user authorization check using userId (from session or request)
  const session = await getServerSession(authOptions); // Or whatever method you're using to get the session

  if (!session || session.user.id !== userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Proceed with gallery item deletion logic here
    const galleryItem = await prisma.galleryItem.findUnique({ where: { id } });
    if (!galleryItem || galleryItem.userId !== userId) {
      return NextResponse.json({ error: 'Artwork not found or not authorized to delete' }, { status: 404 });
    }

    // Perform the delete operation
    await prisma.galleryItem.delete({ where: { id } });

    // Also delete image from Supabase or wherever it's stored

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting artwork:', error);
    return NextResponse.json({ error: 'Failed to delete artwork' }, { status: 500 });
  }
}
