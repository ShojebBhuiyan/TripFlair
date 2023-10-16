/*
  Warnings:

  - Added the required column `contactNumber` to the `RestaurantService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `RestaurantService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subDescription` to the `RestaurantService` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RestaurantService" ADD COLUMN     "contactNumber" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "imageUrls" TEXT[],
ADD COLUMN     "subDescription" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "RestaurantMenuItem" (
    "id" UUID NOT NULL,
    "restaurantId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RestaurantMenuItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantMenuItem_restaurantId_key" ON "RestaurantMenuItem"("restaurantId");

-- AddForeignKey
ALTER TABLE "RestaurantMenuItem" ADD CONSTRAINT "RestaurantMenuItem_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "RestaurantService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
