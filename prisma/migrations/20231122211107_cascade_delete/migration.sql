-- DropForeignKey
ALTER TABLE "BoatServiceBooking" DROP CONSTRAINT "BoatServiceBooking_boatServiceId_fkey";

-- DropForeignKey
ALTER TABLE "HorseRidingBooking" DROP CONSTRAINT "HorseRidingBooking_horseRidingId_fkey";

-- DropForeignKey
ALTER TABLE "HotelBooking" DROP CONSTRAINT "HotelBooking_hotelServiceId_fkey";

-- DropForeignKey
ALTER TABLE "ParasailingBooking" DROP CONSTRAINT "ParasailingBooking_parasailingId_fkey";

-- AddForeignKey
ALTER TABLE "HotelBooking" ADD CONSTRAINT "HotelBooking_hotelServiceId_fkey" FOREIGN KEY ("hotelServiceId") REFERENCES "HotelService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HorseRidingBooking" ADD CONSTRAINT "HorseRidingBooking_horseRidingId_fkey" FOREIGN KEY ("horseRidingId") REFERENCES "HorseRiding"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoatServiceBooking" ADD CONSTRAINT "BoatServiceBooking_boatServiceId_fkey" FOREIGN KEY ("boatServiceId") REFERENCES "BoatService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParasailingBooking" ADD CONSTRAINT "ParasailingBooking_parasailingId_fkey" FOREIGN KEY ("parasailingId") REFERENCES "Parasailing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
