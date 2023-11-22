/*
  Warnings:

  - You are about to drop the column `date` on the `HorseRidingBooking` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `HorseRidingBooking` table. All the data in the column will be lost.
  - Added the required column `address` to the `HorseRiding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mapLink` to the `HorseRiding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overview` to the `HorseRiding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `HorseRiding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtitle` to the `HorseRiding` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `location` on the `HorseRiding` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `dateTime` to the `HorseRidingBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tripDay` to the `HorseRidingBooking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HorseRiding" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "mapLink" TEXT NOT NULL,
ADD COLUMN     "overview" TEXT NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "subtitle" TEXT NOT NULL,
DROP COLUMN "location",
ADD COLUMN     "location" "TripLocation" NOT NULL;

-- AlterTable
ALTER TABLE "HorseRidingBooking" DROP COLUMN "date",
DROP COLUMN "time",
ADD COLUMN     "dateTime" TEXT NOT NULL,
ADD COLUMN     "tripDay" INTEGER NOT NULL;
