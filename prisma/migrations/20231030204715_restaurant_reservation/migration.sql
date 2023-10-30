/*
  Warnings:

  - You are about to drop the column `cost` on the `RestaurantBooking` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `RestaurantBooking` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `RestaurantBooking` table. All the data in the column will be lost.
  - You are about to drop the column `totalPerson` on the `RestaurantBooking` table. All the data in the column will be lost.
  - Added the required column `dateTime` to the `RestaurantBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimatedBudget` to the `RestaurantBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalSeat` to the `RestaurantBooking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RestaurantBooking" DROP COLUMN "cost",
DROP COLUMN "date",
DROP COLUMN "time",
DROP COLUMN "totalPerson",
ADD COLUMN     "dateTime" TEXT NOT NULL,
ADD COLUMN     "estimatedBudget" INTEGER NOT NULL,
ADD COLUMN     "totalSeat" INTEGER NOT NULL;
