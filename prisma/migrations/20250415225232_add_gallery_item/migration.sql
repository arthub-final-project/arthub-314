/*
  Warnings:

  - The primary key for the `GalleryItem` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "GalleryItem" DROP CONSTRAINT "GalleryItem_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "GalleryItem_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "GalleryItem_id_seq";
