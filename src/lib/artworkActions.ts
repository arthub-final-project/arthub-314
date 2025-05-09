import { supabase } from '@/lib/supabase';
import { prisma } from '@/lib/prisma';

export const removeArtwork = async (id: string, userId: number) => {
  if (!id) throw new Error('ID is required');
  try {
    // Fetch the gallery item from the database to get the filename
    const galleryItem = await prisma.galleryItem.findUnique({ where: { id } });
    if (!galleryItem) {
      throw new Error('Artwork not found');
    }
    if (galleryItem.userId !== userId) {
      throw new Error('You are not authorized to delete this artwork');
    }

    // Extract relativePath from the image URL
    const storageUrl = galleryItem.imageUrl;
    const urlPrefix = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/`;

    const relativePath = storageUrl.replace(urlPrefix, '');

    // Delete the image from Supabase storage
    const { error: storageError } = await supabase.storage.from('gallery').remove([relativePath]);

    if (storageError) {
      throw new Error(`Error removing image from Supabase: ${storageError.message}`);
    }

    // Delete the gallery item from the database
    await prisma.galleryItem.delete({ where: { id } });

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error removing artwork:', error.message);
      return { error: error.message || 'Failed to remove artwork' };
    }
    console.error('Unexpected error:', error);
    return { error: 'An unexpected error occurred' };
  }
};

export default removeArtwork;
