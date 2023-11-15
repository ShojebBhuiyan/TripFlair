/*
  Warnings:

  - You are about to drop the column `date` on the `ParasailingBooking` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `ParasailingBooking` table. All the data in the column will be lost.
  - Added the required column `packageDescription` to the `ParasailingBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reservationDateTime` to the `ParasailingBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tripDay` to the `ParasailingBooking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ParasailingBooking" DROP COLUMN "date",
DROP COLUMN "time",
ADD COLUMN     "packageDescription" TEXT NOT NULL,
ADD COLUMN     "reservationDateTime" TEXT NOT NULL,
ADD COLUMN     "tripDay" INTEGER NOT NULL;
