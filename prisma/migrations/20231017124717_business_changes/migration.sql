/*
  Warnings:

  - You are about to drop the column `subDescription` on the `RestaurantService` table. All the data in the column will be lost.
  - Changed the type of `location` on the `RestaurantService` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "RestaurantService" DROP COLUMN "subDescription",
ADD COLUMN     "slogan" TEXT,
DROP COLUMN "location",
ADD COLUMN     "location" "TripLocation" NOT NULL;
