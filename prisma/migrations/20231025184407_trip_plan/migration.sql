-- CreateEnum
CREATE TYPE "TravelMode" AS ENUM ('Bus', 'Train', 'Plane', 'Car');

-- CreateTable
CREATE TABLE "TravelInformation" (
    "id" UUID NOT NULL,
    "tripPlanId" UUID NOT NULL,
    "startDate" TEXT NOT NULL,
    "returnDate" TEXT NOT NULL,
    "travelMode" "TravelMode" NOT NULL,
    "numberOfTravellers" INTEGER NOT NULL,
    "totalCost" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TravelInformation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TravelInformation_tripPlanId_key" ON "TravelInformation"("tripPlanId");

-- AddForeignKey
ALTER TABLE "TravelInformation" ADD CONSTRAINT "TravelInformation_tripPlanId_fkey" FOREIGN KEY ("tripPlanId") REFERENCES "TripPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
