/*
  Warnings:

  - The values [Sunamganj,Coxsbazar,Bandarban,Sylhet] on the enum `TripLocation` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TripLocation_new" AS ENUM ('sunamganj', 'coxsbazar', 'bandarban', 'sylhet');
ALTER TABLE "TripPlan" ALTER COLUMN "tripLocation" TYPE "TripLocation_new" USING ("tripLocation"::text::"TripLocation_new");
ALTER TABLE "RestaurantService" ALTER COLUMN "location" TYPE "TripLocation_new" USING ("location"::text::"TripLocation_new");
ALTER TABLE "HotelService" ALTER COLUMN "location" TYPE "TripLocation_new" USING ("location"::text::"TripLocation_new");
ALTER TYPE "TripLocation" RENAME TO "TripLocation_old";
ALTER TYPE "TripLocation_new" RENAME TO "TripLocation";
DROP TYPE "TripLocation_old";
COMMIT;
