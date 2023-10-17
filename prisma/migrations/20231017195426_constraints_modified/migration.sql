-- DropForeignKey
ALTER TABLE "BusinessProfile" DROP CONSTRAINT "BusinessProfile_userId_fkey";

-- DropIndex
DROP INDEX "BoatService_businessId_key";

-- DropIndex
DROP INDEX "HorseRiding_businessId_key";

-- DropIndex
DROP INDEX "HotelService_businessId_key";

-- DropIndex
DROP INDEX "Parasailing_businessId_key";

-- DropIndex
DROP INDEX "RestaurantMenuItem_restaurantId_key";

-- DropIndex
DROP INDEX "RestaurantService_businessId_key";

-- AddForeignKey
ALTER TABLE "BusinessProfile" ADD CONSTRAINT "BusinessProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
