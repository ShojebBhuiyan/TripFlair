/*
  Warnings:

  - You are about to drop the column `name` on the `BoatService` table. All the data in the column will be lost.
  - Added the required column `address` to the `BoatService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookingPolicy` to the `BoatService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkInPolicy` to the `BoatService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactNumber` to the `BoatService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mapLink` to the `BoatService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overview` to the `BoatService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `BoatService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `BoatService` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `location` on the `BoatService` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "BoatService" DROP COLUMN "name",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "bookingPolicy" TEXT NOT NULL,
ADD COLUMN     "checkInPolicy" TEXT NOT NULL,
ADD COLUMN     "contactNumber" TEXT NOT NULL,
ADD COLUMN     "imageUrls" TEXT[],
ADD COLUMN     "mapLink" TEXT NOT NULL,
ADD COLUMN     "overview" TEXT NOT NULL,
ADD COLUMN     "perks" TEXT[],
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
DROP COLUMN "location",
ADD COLUMN     "location" "TripLocation" NOT NULL;
