-- DropForeignKey
ALTER TABLE "TravelInformation" DROP CONSTRAINT "TravelInformation_tripPlanId_fkey";

-- AddForeignKey
ALTER TABLE "TravelInformation" ADD CONSTRAINT "TravelInformation_tripPlanId_fkey" FOREIGN KEY ("tripPlanId") REFERENCES "TripPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
