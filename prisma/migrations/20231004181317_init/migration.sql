-- CreateEnum
CREATE TYPE "PresentLocation" AS ENUM ('Dhaka', 'Chattogram', 'Barishal', 'Khulna', 'Mymensingh', 'Rangpur', 'Rajshahi');

-- CreateEnum
CREATE TYPE "ProfileType" AS ENUM ('Traveller', 'Business');

-- CreateEnum
CREATE TYPE "BusinessType" AS ENUM ('HorseRiding', 'BoatService', 'RestaurantService', 'HotelService', 'Parasailing');

-- CreateEnum
CREATE TYPE "TripLocation" AS ENUM ('Sunamganj', 'Coxsbazar', 'Bandarban', 'Sylhet');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profileType" "ProfileType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TravellerProfile" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "presentLocation" "PresentLocation" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TravellerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessProfile" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "businessType" "BusinessType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripPlan" (
    "id" UUID NOT NULL,
    "travellerId" UUID NOT NULL,
    "tripLocation" "TripLocation" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TripPlan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TravellerProfile_userId_key" ON "TravellerProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessProfile_userId_key" ON "BusinessProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TripPlan_travellerId_key" ON "TripPlan"("travellerId");

-- AddForeignKey
ALTER TABLE "TravellerProfile" ADD CONSTRAINT "TravellerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessProfile" ADD CONSTRAINT "BusinessProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripPlan" ADD CONSTRAINT "TripPlan_travellerId_fkey" FOREIGN KEY ("travellerId") REFERENCES "TravellerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
