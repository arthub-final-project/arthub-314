import * as Yup from 'yup';

export interface Event {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  description: string;
  image: string;
}

export type FormInputs = {
  name: string;
  contact: string;
  image: FileList;
  socialMedia: string;
  artpiece: FileList;
  description: string;
  owner: string;
};

const fileSchema = Yup.mixed<FileList>()
  .required('File is required')
  .test('fileExists', 'File is required', (value): value is FileList => value instanceof FileList && value.length > 0)
  .test('fileType', 'Unsupported file format', (value): value is FileList => (
    value instanceof FileList &&
      ['image/png', 'image/jpg', 'image/jpeg'].includes(value[0]?.type)
  ));

export const AddProfileSchema: Yup.ObjectSchema<FormInputs> = Yup.object({
  name: Yup.string().required('Name is required'),
  contact: Yup.string().required('Contact is required'),
  image: fileSchema,
  socialMedia: Yup.string().required('Social media is required'),
  artpiece: fileSchema,
  description: Yup.string().required('Description is required'),
  owner: Yup.string().required('Owner is required'),
});

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

export const EditProfileSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  contact: Yup.string().required('Contact is required'),
  socialMedia: Yup.string().required('Social media is required'),
  description: Yup.string().required('Description is required'),
  image: Yup.mixed()
    .test('image-required', 'Image is required', function (value) {
      const contextImage = this.options.context?.image;
      if ((value instanceof FileList && value.length > 0) || contextImage) return true;
      return false;
    })
    .test('image-type', 'Unsupported file format', function (value) {
      const fileList = value as FileList | null;
      if (fileList && fileList[0]) {
        return ['image/png', 'image/jpg', 'image/jpeg'].includes(fileList[0].type);
      }
      return true;
    }),
  artpiece: Yup.mixed()
    .test('artpiece-required', 'Artpiece is required', function (value) {
      const contextArtpiece = this.options.context?.artpiece;
      if ((value instanceof FileList && value.length > 0) || contextArtpiece) return true;
      return false;
    })
    .test('artpiece-type', 'Unsupported file format', function (value) {
      const fileList = value as FileList | null;
      if (fileList && fileList[0]) {
        return ['image/png', 'image/jpg', 'image/jpeg'].includes(fileList[0].type);
      }
      return true;
    }),
});
