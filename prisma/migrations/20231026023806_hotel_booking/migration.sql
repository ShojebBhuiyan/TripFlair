/*
  Warnings:

  - You are about to drop the `RoomBooking` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RoomBooking" DROP CONSTRAINT "RoomBooking_hotelRoomId_fkey";

-- DropForeignKey
ALTER TABLE "RoomBooking" DROP CONSTRAINT "RoomBooking_tripPlanId_fkey";

-- DropTable
DROP TABLE "RoomBooking";

-- CreateTable
CREATE TABLE "HotelBooking" (
    "id" UUID NOT NULL,
    "hotelRoomId" UUID NOT NULL,
    "tripPlanId" UUID NOT NULL,
    "hotelServiceId" UUID NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "checkinDate" TEXT NOT NULL,
    "checkoutDate" TEXT NOT NULL,
    "totalRoom" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HotelBooking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HotelBooking_tripPlanId_key" ON "HotelBooking"("tripPlanId");

-- AddForeignKey
ALTER TABLE "HotelBooking" ADD CONSTRAINT "HotelBooking_hotelRoomId_fkey" FOREIGN KEY ("hotelRoomId") REFERENCES "HotelRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HotelBooking" ADD CONSTRAINT "HotelBooking_tripPlanId_fkey" FOREIGN KEY ("tripPlanId") REFERENCES "TripPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HotelBooking" ADD CONSTRAINT "HotelBooking_hotelServiceId_fkey" FOREIGN KEY ("hotelServiceId") REFERENCES "HotelService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
