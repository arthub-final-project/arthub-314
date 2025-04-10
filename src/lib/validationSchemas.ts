import * as Yup from 'yup';
import { Role } from '@prisma/client';

export const AddProfileSchema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  image: Yup.string().required(),
  followers: Yup.number().positive().required(),
  role: Yup.string().oneOf(Object.values(Role)).required(),
  owner: Yup.string().required(),
});

export const EditProfileSchema = Yup.object({
  id: Yup.number().required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  image: Yup.string().required(),
  followers: Yup.number().positive().required(),
  role: Yup.string().oneOf(Object.values(Role)).required(),
  owner: Yup.string().required(),
});
