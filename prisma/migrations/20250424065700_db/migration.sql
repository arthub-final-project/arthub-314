/*
  Warnings:

  - The primary key for the `GalleryItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `GalleryItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `owner` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GalleryItem" DROP CONSTRAINT "GalleryItem_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "GalleryItem_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "owner",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
