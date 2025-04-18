import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

// eslint-disable-next-line import/prefer-default-export
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

  const timestamp = Date.now();
  const sanitizedFilename = file.name.replace(/\s+/g, '-');
  const fileName = `${timestamp}-${sanitizedFilename}`;
  const filePath = path.join(process.cwd(), 'public/uploads', fileName);

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await writeFile(filePath, buffer);

  const imageUrl = `/uploads/${fileName}`;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

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
