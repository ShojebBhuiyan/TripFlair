-- DropForeignKey
ALTER TABLE "HotelRoom" DROP CONSTRAINT "HotelRoom_hotelId_fkey";

-- AddForeignKey
ALTER TABLE "HotelRoom" ADD CONSTRAINT "HotelRoom_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "HotelService"("id") ON DELETE CASCADE ON UPDATE CASCADE;
