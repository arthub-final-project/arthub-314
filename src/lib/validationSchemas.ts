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
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  image: Yup
    .mixed<FileList>()
    .test('required', 'An image is required', (value) => value && value.length > 0),
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
