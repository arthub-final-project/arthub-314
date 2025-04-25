'use server';

import { Profile /* Role */ } from '@prisma/client'; // Role not used
import { hash, compare } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

export async function addProfile(
  profile: {
    name: string;
    contact: string;
    image: string;
    socialMedia: string;
    artpiece: string;
    description: string;
    owner: string;
  },
) {
  await prisma.profile.create({
    data: {
      name: profile.name,
      contact: profile.contact,
      image: profile.image,
      socialMedia: profile.socialMedia,
      artpiece: profile.artpiece,
      description: profile.description,
      owner: profile.owner,
    },
  });
  redirect('/list');
}

export async function editProfile(profile: Profile) {
  await prisma.profile.update({
    where: { id: profile.id },
    data: {
      name: profile.name,
      contact: profile.contact,
      image: profile.image,
      socialMedia: profile.socialMedia,
      artpiece: profile.artpiece,
      description: profile.description,
      owner: profile.owner,
    },
  });
  redirect('/list');
}

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { email: string; password: string; role?: 'Artist' | 'Collector' }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
      role: credentials.role ?? 'Collector',
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; oldpassword: string; password: string }) {
  const user = await prisma.user.findUnique({ where: { email: credentials.email } });
  if (!user) throw new Error('User not found');

  const isOldPasswordCorrect = await compare(credentials.oldpassword, user.password);
  if (!isOldPasswordCorrect) throw new Error('Old password is incorrect');

  const hashedPassword = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: { password: hashedPassword },
  });
}

export async function addGalleryItem(item: {
  title: string;
  imageUrl: string;
  userId: number;
}) {
  await prisma.galleryItem.create({
    data: {
      title: item.title,
      imageUrl: item.imageUrl,
      userId: item.userId,
      createdAt: new Date(), // optional — Prisma defaults to now()
    },
  });
}
