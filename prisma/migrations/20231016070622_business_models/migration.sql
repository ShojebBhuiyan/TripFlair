/*
  Warnings:

  - You are about to drop the column `presentLocation` on the `TravellerProfile` table. All the data in the column will be lost.
  - Added the required column `presentLocation` to the `TripPlan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TravellerProfile" DROP CONSTRAINT "TravellerProfile_userId_fkey";

-- AlterTable
ALTER TABLE "TravellerProfile" DROP COLUMN "presentLocation";

-- AlterTable
ALTER TABLE "TripPlan" ADD COLUMN     "presentLocation" "PresentLocation" NOT NULL;

-- CreateTable
CREATE TABLE "RestaurantService" (
    "id" UUID NOT NULL,
    "businessId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RestaurantService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HotelService" (
    "id" UUID NOT NULL,
    "businessId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HotelService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HorseRiding" (
    "id" UUID NOT NULL,
    "businessId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HorseRiding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoatService" (
    "id" UUID NOT NULL,
    "businessId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BoatService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parasailing" (
    "id" UUID NOT NULL,
    "businessId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Parasailing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantService_businessId_key" ON "RestaurantService"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "HotelService_businessId_key" ON "HotelService"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "HorseRiding_businessId_key" ON "HorseRiding"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "BoatService_businessId_key" ON "BoatService"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "Parasailing_businessId_key" ON "Parasailing"("businessId");

-- AddForeignKey
ALTER TABLE "TravellerProfile" ADD CONSTRAINT "TravellerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RestaurantService" ADD CONSTRAINT "RestaurantService_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "BusinessProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HotelService" ADD CONSTRAINT "HotelService_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "BusinessProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HorseRiding" ADD CONSTRAINT "HorseRiding_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "BusinessProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoatService" ADD CONSTRAINT "BoatService_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "BusinessProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parasailing" ADD CONSTRAINT "Parasailing_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "BusinessProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
