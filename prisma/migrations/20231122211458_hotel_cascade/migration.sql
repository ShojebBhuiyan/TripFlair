-- DropForeignKey
ALTER TABLE "RestaurantBooking" DROP CONSTRAINT "RestaurantBooking_restaurantId_fkey";

-- AddForeignKey
ALTER TABLE "RestaurantBooking" ADD CONSTRAINT "RestaurantBooking_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "RestaurantService"("id") ON DELETE CASCADE ON UPDATE CASCADE;
