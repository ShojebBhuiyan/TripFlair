/*
  Warnings:

  - You are about to drop the column `hotelRoomId` on the `HotelBooking` table. All the data in the column will be lost.
  - Added the required column `hotelRoomType` to the `HotelBooking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HotelBooking" DROP CONSTRAINT "HotelBooking_hotelRoomId_fkey";

-- AlterTable
ALTER TABLE "HotelBooking" DROP COLUMN "hotelRoomId",
ADD COLUMN     "hotelRoomType" TEXT NOT NULL;
