-- DropForeignKey
ALTER TABLE "RestaurantMenuItem" DROP CONSTRAINT "RestaurantMenuItem_restaurantId_fkey";

-- AddForeignKey
ALTER TABLE "RestaurantMenuItem" ADD CONSTRAINT "RestaurantMenuItem_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "RestaurantService"("id") ON DELETE CASCADE ON UPDATE CASCADE;
