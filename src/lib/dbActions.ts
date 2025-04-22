'use server';

import { Stuff, Condition, Profile } from '@prisma/client';
import { hash, compare } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Adds a new stuff to the database.
 * @param stuff, an object with the following properties: name, quantity, owner, condition.
 */
export async function addStuff(stuff: { name: string; quantity: number; owner: string; condition: string }) {
  // console.log(`addStuff data: ${JSON.stringify(stuff, null, 2)}`);
  let condition: Condition = 'good';
  if (stuff.condition === 'poor') {
    condition = 'poor';
  } else if (stuff.condition === 'excellent') {
    condition = 'excellent';
  } else {
    condition = 'fair';
  }
  await prisma.stuff.create({
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition,
    },
  });
  // After adding, redirect to the list page
  redirect('/list');
}

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
 * Edits an existing stuff in the database.
 * @param stuff, an object with the following properties: id, name, quantity, owner, condition.
 */
export async function editStuff(stuff: Stuff) {
  // console.log(`editStuff data: ${JSON.stringify(stuff, null, 2)}`);
  await prisma.stuff.update({
    where: { id: stuff.id },
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition: stuff.condition,
    },
  });
  // After updating, redirect to the list page
  redirect('/list');
}

/**
 * Deletes an existing stuff from the database.
 * @param id, the id of the stuff to delete.
 */
export async function deleteStuff(id: number) {
  // console.log(`deleteStuff id: ${id}`);
  await prisma.stuff.delete({
    where: { id },
  });
  // After deleting, redirect to the list page
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
