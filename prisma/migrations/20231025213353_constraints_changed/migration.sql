/*
  Warnings:

  - The values [sunamganj,coxsbazar,bandarban,sylhet] on the enum `TripLocation` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[tripPlanId]` on the table `RoomBooking` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TripLocation_new" AS ENUM ('Sunamganj', 'Coxsbazar', 'Bandarban', 'Sylhet');
ALTER TABLE "TripPlan" ALTER COLUMN "tripLocation" TYPE "TripLocation_new" USING ("tripLocation"::text::"TripLocation_new");
ALTER TABLE "RestaurantService" ALTER COLUMN "location" TYPE "TripLocation_new" USING ("location"::text::"TripLocation_new");
ALTER TABLE "HotelService" ALTER COLUMN "location" TYPE "TripLocation_new" USING ("location"::text::"TripLocation_new");
ALTER TYPE "TripLocation" RENAME TO "TripLocation_old";
ALTER TYPE "TripLocation_new" RENAME TO "TripLocation";
DROP TYPE "TripLocation_old";
COMMIT;

-- CreateIndex
CREATE UNIQUE INDEX "RoomBooking_tripPlanId_key" ON "RoomBooking"("tripPlanId");
