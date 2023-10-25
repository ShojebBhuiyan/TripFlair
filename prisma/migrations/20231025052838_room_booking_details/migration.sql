/*
  Warnings:

  - Added the required column `checkinDate` to the `RoomBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkoutDate` to the `RoomBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cost` to the `RoomBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `RoomBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `RoomBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `RoomBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalRoom` to the `RoomBooking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RoomBooking" ADD COLUMN     "checkinDate" TEXT NOT NULL,
ADD COLUMN     "checkoutDate" TEXT NOT NULL,
ADD COLUMN     "cost" INTEGER NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "totalRoom" INTEGER NOT NULL;
