/*
  Warnings:

  - Added the required column `mapLink` to the `Parasailing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Parasailing" ADD COLUMN     "imageUrls" TEXT[],
ADD COLUMN     "mapLink" TEXT NOT NULL;
