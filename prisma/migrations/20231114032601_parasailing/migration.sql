/*
  Warnings:

  - Added the required column `address` to the `Parasailing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactNumber` to the `Parasailing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overview` to the `Parasailing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtitle` to the `Parasailing` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `location` on the `Parasailing` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Parasailing" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "contactNumber" TEXT NOT NULL,
ADD COLUMN     "overview" TEXT NOT NULL,
ADD COLUMN     "subtitle" TEXT NOT NULL,
DROP COLUMN "location",
ADD COLUMN     "location" "TripLocation" NOT NULL;

-- CreateTable
CREATE TABLE "ParasailingPackages" (
    "id" UUID NOT NULL,
    "parasailingId" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ParasailingPackages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ParasailingPackages" ADD CONSTRAINT "ParasailingPackages_parasailingId_fkey" FOREIGN KEY ("parasailingId") REFERENCES "Parasailing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
