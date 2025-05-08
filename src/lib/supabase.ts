/* eslint-disable import/prefer-default-export */
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const uploadImageAndGetURL = async (
  file: File,
  folder: string,
): Promise<string> => {
  const timestamp = Date.now();
  const filePath = `${folder}/${timestamp}_${file.name}`;

  const { error } = await supabase.storage
    .from('profile-images') // ✅ your bucket name here
    .upload(filePath, file);

  if (error) throw new Error(`Upload failed: ${error.message}`);

  const { data } = supabase.storage
    .from('profile-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
};
