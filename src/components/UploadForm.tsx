'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddGalleryItemSchema } from '@/lib/validationSchemas';

export const dynamic = 'force-dynamic';

interface UploadFormInputs {
  title: string;
  description: string;
  image?: FileList;
}

export default function UploadForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm<UploadFormInputs>({
    resolver: yupResolver(AddGalleryItemSchema),
  });

  const onSubmit = async (data: UploadFormInputs) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    if (data.image && data.image[0]) {
      formData.append('image', data.image[0]);
    }

    const res = await fetch('/api/gallery/upload', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      console.log('Upload successful!'); // Replace with a toast notification if available
      reset();
      setPreview(null);
    } else {
      console.error('Upload failed.'); // Replace with a toast notification if available
    }
  };

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register('title')} placeholder="Title" className="form-control" />
      <textarea {...register('description')} placeholder="Description" className="form-control" />
      <input
        type="file"
        accept="image/*"
        {...register('image')}
        onChange={handleImagePreview}
        className="form-control"
      />
      {preview && (
        <Image
          src={preview}
          alt="Preview"
          className="img-thumbnail mt-2"
          style={{ maxHeight: 200 }}
          width={200}
          height={200}
        />
      )}
      <button type="submit" className="btn btn-primary">Upload</button>
    </form>
  );
}
