'use server';

import { Profile } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Adds a new profile to the database.
 * @param profile, an object with the following properties: id, firstName, lastName, image, followers, role, owner.
 */

export async function addProfile(profile: Profile) {
  // console.log(`addProfile data: ${JSON.stringify(profile, null, 2)}`);
  await prisma.profile.create({
    data: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      image: profile.image,
      followers: profile.followers,
      role: profile.role,
      owner: profile.owner,
    },
  });
  // After adding, redirect to the list page
  redirect('/list');
}

/**
 * Edits an existing profile in the database.
 * @param profile, an object with the following properties: id, firstName, lastName, image, followers, role, owner.
 */
export async function editProfile(profile: Profile) {
  // console.log(`editProfile data: ${JSON.stringify(profile, null, 2)}`);
  await prisma.profile.update({
    where: { id: profile.id },
    data: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      image: profile.image,
      followers: profile.followers,
      role: profile.role,
      owner: profile.owner,
    },
  });
  // After updating, redirect to the list page
  redirect('/list');
}

/**
 * Deletes an existing profile from the database.
 * @param id, the id of the profile to delete.
 */
export async function deleteProfile(id: number) {
  // console.log(`deleteProfile id: ${id}`);
  await prisma.profile.delete({
    where: { id },
  });
  // After deleting, redirect to the list page
  redirect('/list');
}

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { email: string; password: string }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}
