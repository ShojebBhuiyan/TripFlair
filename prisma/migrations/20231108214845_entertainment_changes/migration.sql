/*
  Warnings:

  - You are about to drop the column `entertainmentId` on the `BoatServiceBooking` table. All the data in the column will be lost.
  - You are about to drop the column `entertainmentId` on the `HorseRidingBooking` table. All the data in the column will be lost.
  - You are about to drop the column `entertainmentId` on the `ParasailingBooking` table. All the data in the column will be lost.
  - You are about to drop the `Entertainment` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[tripPlanId]` on the table `BoatServiceBooking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tripPlanId]` on the table `HorseRidingBooking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tripPlanId]` on the table `ParasailingBooking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tripPlanId` to the `BoatServiceBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tripPlanId` to the `HorseRidingBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tripPlanId` to the `ParasailingBooking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BoatServiceBooking" DROP CONSTRAINT "BoatServiceBooking_entertainmentId_fkey";

-- DropForeignKey
ALTER TABLE "Entertainment" DROP CONSTRAINT "Entertainment_tripPlanId_fkey";

-- DropForeignKey
ALTER TABLE "HorseRidingBooking" DROP CONSTRAINT "HorseRidingBooking_entertainmentId_fkey";

-- DropForeignKey
ALTER TABLE "ParasailingBooking" DROP CONSTRAINT "ParasailingBooking_entertainmentId_fkey";

-- AlterTable
ALTER TABLE "BoatServiceBooking" DROP COLUMN "entertainmentId",
ADD COLUMN     "tripPlanId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "HorseRidingBooking" DROP COLUMN "entertainmentId",
ADD COLUMN     "tripPlanId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "ParasailingBooking" DROP COLUMN "entertainmentId",
ADD COLUMN     "tripPlanId" UUID NOT NULL;

-- DropTable
DROP TABLE "Entertainment";

-- CreateIndex
CREATE UNIQUE INDEX "BoatServiceBooking_tripPlanId_key" ON "BoatServiceBooking"("tripPlanId");

-- CreateIndex
CREATE UNIQUE INDEX "HorseRidingBooking_tripPlanId_key" ON "HorseRidingBooking"("tripPlanId");

-- CreateIndex
CREATE UNIQUE INDEX "ParasailingBooking_tripPlanId_key" ON "ParasailingBooking"("tripPlanId");

-- AddForeignKey
ALTER TABLE "HorseRidingBooking" ADD CONSTRAINT "HorseRidingBooking_tripPlanId_fkey" FOREIGN KEY ("tripPlanId") REFERENCES "TripPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoatServiceBooking" ADD CONSTRAINT "BoatServiceBooking_tripPlanId_fkey" FOREIGN KEY ("tripPlanId") REFERENCES "TripPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParasailingBooking" ADD CONSTRAINT "ParasailingBooking_tripPlanId_fkey" FOREIGN KEY ("tripPlanId") REFERENCES "TripPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
