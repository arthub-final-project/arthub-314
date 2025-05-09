/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.formData();
  const title = formData.get('title') as string;
  const file = formData.get('image') as File;

  if (!file || !file.name) {
    return NextResponse.json({ error: 'No image uploaded' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const cleanFileName = fileName.replace(/^\/+/, ''); // removes leading slashes

  const { error } = await supabase.storage
    .from('gallery')
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: false,
      metadata: { owner: session.user.id },
    });

  if (error) {
    console.error('Supabase upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email, id: Number(session.user.id) },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/${cleanFileName}`;

  await prisma.galleryItem.create({
    data: {
      title,
      imageUrl,
      userId: user.id,
      createdAt: new Date(),
    },
  });

  return NextResponse.json({ success: true });
}

/* This function grabs uploaded images from the supabase bucket */
export async function GET() {
  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: { createdAt: 'desc' }, // Optional: show newest first
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
    console.error('Error fetching gallery items:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery items' }, { status: 500 });
  }
}

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
