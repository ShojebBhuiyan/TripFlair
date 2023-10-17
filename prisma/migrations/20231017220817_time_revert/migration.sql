/*
  Warnings:

  - Changed the type of `checkInTime` on the `HotelService` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "HotelService" DROP COLUMN "checkInTime",
ADD COLUMN     "checkInTime" TIMESTAMP(3) NOT NULL;
