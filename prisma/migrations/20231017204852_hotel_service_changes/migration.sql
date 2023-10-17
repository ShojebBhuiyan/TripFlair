/*
  Warnings:

  - Added the required column `address` to the `HotelService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkInTime` to the `HotelService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactNumber` to the `HotelService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overview` to the `HotelService` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `location` on the `HotelService` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "HotelService" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "checkInTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "contactNumber" TEXT NOT NULL,
ADD COLUMN     "imageUrls" TEXT[],
ADD COLUMN     "overview" TEXT NOT NULL,
ADD COLUMN     "perks" TEXT[],
ADD COLUMN     "slogan" TEXT,
DROP COLUMN "location",
ADD COLUMN     "location" "TripLocation" NOT NULL;

-- CreateTable
CREATE TABLE "HotelRoom" (
    "id" UUID NOT NULL,
    "hotelId" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HotelRoom_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HotelRoom" ADD CONSTRAINT "HotelRoom_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "HotelService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
