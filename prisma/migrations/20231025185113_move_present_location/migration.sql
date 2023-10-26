/*
  Warnings:

  - You are about to drop the column `presentLocation` on the `TripPlan` table. All the data in the column will be lost.
  - Added the required column `presentLocation` to the `TravelInformation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TravelInformation" ADD COLUMN     "presentLocation" "PresentLocation" NOT NULL;

-- AlterTable
ALTER TABLE "TripPlan" DROP COLUMN "presentLocation";
