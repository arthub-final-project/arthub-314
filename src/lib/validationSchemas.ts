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
  image: Yup.mixed<FileList>()
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

export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const AddProfileSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  contact: Yup.string().required('Contact is required'),
  image: Yup.mixed()
    .required('Image is required')
    .test('fileExists', 'Image is required', (value: unknown) => {
      const fileList = value as FileList | void;
      return fileList && fileList.length > 0; // Check if there's at least one file
    })
    .test('fileType', 'Unsupported file format', (value: unknown) => {
      const fileList = value as FileList | void;
      return (
        fileList &&
        fileList[0] &&
        ['image/png', 'image/jpg', 'image/jpeg'].includes(fileList[0].type)
      );
    }),
  socialMedia: Yup.string().required('Social media is required'),
  artpiece: Yup.mixed()
    .required('Artpiece is required')
    .test('fileExists', 'Artpiece is required', (value: unknown) => {
      const fileList = value as FileList | void;
      return fileList && fileList.length > 0; // Check if there's at least one file
    })
    .test('fileType', 'Unsupported file format', (value: unknown) => {
      const fileList = value as FileList | void;
      return (
        fileList &&
        fileList[0] &&
        ['image/png', 'image/jpg', 'image/jpeg'].includes(fileList[0].type)
      );
    }),
  description: Yup.string().required('Description is required'),
  owner: Yup.string().required('Owner is required'),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const EditProfileSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  contact: Yup.string().required('Contact is required'),
  socialMedia: Yup.string().required('Social media is required'),
  description: Yup.string().required('Description is required'),

  image: Yup.mixed()
    .test('image-required', 'Image is required', function (value) {
      const contextImage = this.options.context?.image;
      // If no new image is selected, but there's an existing one, it's valid
      if ((value instanceof FileList && value.length > 0) || contextImage) {
        return true;
      }
      return false; // If neither is present, it's required
    })
    .test('image-type', 'Unsupported file format', function (value) {
      const fileList = value as FileList | null;
      if (fileList && fileList[0]) {
        return ['image/png', 'image/jpg', 'image/jpeg'].includes(fileList[0].type);
      }
      return true; // Skip validation if no file is selected (i.e., if context is used)
    }),

  artpiece: Yup.mixed()
    .test('artpiece-required', 'Artpiece is required', function (value) {
      const contextArtpiece = this.options.context?.artpiece;
      // If no new artpiece is selected, but there's an existing one, it's valid
      if ((value instanceof FileList && value.length > 0) || contextArtpiece) {
        return true;
      }
      return false; // If neither is present, it's required
    })
    .test('artpiece-type', 'Unsupported file format', function (value) {
      const fileList = value as FileList | null;
      if (fileList && fileList[0]) {
        return ['image/png', 'image/jpg', 'image/jpeg'].includes(fileList[0].type);
      }
      return true; // Skip validation if no file is selected (i.e., if context is used)
    }),
});
