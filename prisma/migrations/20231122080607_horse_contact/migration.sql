/*
  Warnings:

  - Added the required column `contactNumber` to the `HorseRiding` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HorseRiding" ADD COLUMN     "contactNumber" TEXT NOT NULL;
