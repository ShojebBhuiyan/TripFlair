/*
  Warnings:

  - Added the required column `checkOutTime` to the `HotelService` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HotelService" ADD COLUMN     "checkOutTime" TEXT NOT NULL;
