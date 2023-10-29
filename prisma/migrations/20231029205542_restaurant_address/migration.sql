/*
  Warnings:

  - Added the required column `address` to the `RestaurantService` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RestaurantService" ADD COLUMN     "address" TEXT NOT NULL;
