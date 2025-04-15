-- AlterTable
ALTER TABLE "Stuff" ALTER COLUMN "condition" SET DEFAULT 'good';

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "socialMedia" TEXT NOT NULL,
    "artpiece" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "owner" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);
