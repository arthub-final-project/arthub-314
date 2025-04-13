import * as Yup from 'yup';

export const AddGalleryItemSchema = Yup.object({
  title: Yup.string().required(),
  description: Yup.string().required(),
  image: Yup.string().url().required(),
});

export type GalleryItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  createdAt: Date;
};

export type User = {
  id: string;
  name: string;
  email: string;
  profileImage: string;
  bio: string;
  createdAt: Date;
};
