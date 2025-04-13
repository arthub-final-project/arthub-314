import * as Yup from 'yup';

export interface Event {
  id: string;
  firstName: string;
  lastName: string;
  address: string; // This is like 'OAHU'
  description: string;
  image: string;
}
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
