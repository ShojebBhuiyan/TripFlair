-- DropForeignKey
ALTER TABLE "BoatServiceBooking" DROP CONSTRAINT "BoatServiceBooking_tripPlanId_fkey";

-- DropForeignKey
ALTER TABLE "HorseRidingBooking" DROP CONSTRAINT "HorseRidingBooking_tripPlanId_fkey";

-- DropForeignKey
ALTER TABLE "ParasailingBooking" DROP CONSTRAINT "ParasailingBooking_tripPlanId_fkey";

-- DropForeignKey
ALTER TABLE "RestaurantBooking" DROP CONSTRAINT "RestaurantBooking_tripPlanId_fkey";

-- AddForeignKey
ALTER TABLE "RestaurantBooking" ADD CONSTRAINT "RestaurantBooking_tripPlanId_fkey" FOREIGN KEY ("tripPlanId") REFERENCES "TripPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HorseRidingBooking" ADD CONSTRAINT "HorseRidingBooking_tripPlanId_fkey" FOREIGN KEY ("tripPlanId") REFERENCES "TripPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoatServiceBooking" ADD CONSTRAINT "BoatServiceBooking_tripPlanId_fkey" FOREIGN KEY ("tripPlanId") REFERENCES "TripPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParasailingBooking" ADD CONSTRAINT "ParasailingBooking_tripPlanId_fkey" FOREIGN KEY ("tripPlanId") REFERENCES "TripPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
