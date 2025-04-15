import * as Yup from 'yup';
import { InferType } from 'yup';

export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const AddProfileSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  contact: Yup.string().required('Contact is required'),
  image: Yup.mixed<FileList>()
    .nullable()
    .required('Image is required')
    .test('fileExists', 'Image is required', (value) => {
      return value instanceof FileList && value.length > 0;
    })
    .test('fileType', 'Unsupported file format', (value) => {
      if (!(value instanceof FileList)) return false;
      const file = value[0];
      return file && ['image/png', 'image/jpg', 'image/jpeg'].includes(file.type);
    }),
  artpiece: Yup.mixed<FileList>()
    .nullable()
    .required('Artpiece is required')
    .test('fileExists', 'Artpiece is required', (value) => {
      return value instanceof FileList && value.length > 0;
    })
    .test('fileType', 'Unsupported file format', (value) => {
      if (!(value instanceof FileList)) return false;
      const file = value[0];
      return file && ['image/png', 'image/jpg', 'image/jpeg'].includes(file.type);
    }),
  socialMedia: Yup.string().required('Social media is required'),
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

export type AddProfileFormSchema = InferType<typeof AddProfileSchema>;
