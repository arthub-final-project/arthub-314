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

  const { error } = await supabase.storage
    .from('gallery')
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    console.error('Supabase upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/${fileName}`;

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
    const { data, error } = await supabase.storage
      .from('gallery') // Access the "gallery" bucket
      .list('', { limit: 10 }); // Get a list of files (limit as needed)

    if (error) {
      console.error('Error fetching data from Supabase storage:', error.message);
      return NextResponse.json({ error: 'Failed to fetch images from storage' }, { status: 500 });
    }

    // Process the data to get the image URLs
    const imageUrls = data?.map((file) => `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/${file.name}`);

    return NextResponse.json(imageUrls); // Return the image URLs in the response
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery items' }, { status: 500 });
  }
}
