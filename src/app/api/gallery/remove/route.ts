/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { supabase } from '@/lib/supabase';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { searchParams } = req.nextUrl;
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing or invalid ID' }, { status: 400 });
  }
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    // First fetch the gallery item to get the filename
    const galleryItem = await prisma.galleryItem.findUnique({ where: { id } });

    if (!galleryItem) {
      return NextResponse.json({ error: 'Artwork not found' }, { status: 404 });
    }

    // Check if the current user is the owner
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || galleryItem.userId !== Number(user.id)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Extract the filename from the URL
    console.log('Gallery Item:', galleryItem); // Log the whole item
    console.log('Image URL:', galleryItem.imageUrl); // Log just the imageUrl
    const fileName = galleryItem.imageUrl.split('/').pop()!;
    console.log('File to delete from Supabase:', fileName);

    // Delete from Supabase storage
    const { error: storageError } = await supabase.storage
      .from('gallery')
      .remove([fileName]);

    if (storageError) {
      console.error('Error removing image from Supabase:', storageError);
    }

    // Delete from database
    await prisma.galleryItem.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting artwork:', error);
    return NextResponse.json({ error: 'Failed to delete artwork' }, { status: 500 });
  }
}
