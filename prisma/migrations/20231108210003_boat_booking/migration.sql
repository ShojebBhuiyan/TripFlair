/*
  Warnings:

  - You are about to drop the column `cost` on the `BoatServiceBooking` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `BoatServiceBooking` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `BoatServiceBooking` table. All the data in the column will be lost.
  - You are about to drop the column `totalPerson` on the `BoatServiceBooking` table. All the data in the column will be lost.
  - Added the required column `dateTime` to the `BoatServiceBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalBoats` to the `BoatServiceBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalCost` to the `BoatServiceBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tripDay` to the `BoatServiceBooking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BoatServiceBooking" DROP COLUMN "cost",
DROP COLUMN "date",
DROP COLUMN "time",
DROP COLUMN "totalPerson",
ADD COLUMN     "dateTime" TEXT NOT NULL,
ADD COLUMN     "totalBoats" INTEGER NOT NULL,
ADD COLUMN     "totalCost" INTEGER NOT NULL,
ADD COLUMN     "tripDay" INTEGER NOT NULL;
