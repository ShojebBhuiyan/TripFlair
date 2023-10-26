-- CreateTable
CREATE TABLE "Entertainment" (
    "id" UUID NOT NULL,
    "tripPlanId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Entertainment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HorseRidingBooking" (
    "id" UUID NOT NULL,
    "horseRidingId" UUID NOT NULL,
    "entertainmentId" UUID NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "totalPerson" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HorseRidingBooking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoatServiceBooking" (
    "id" UUID NOT NULL,
    "boatServiceId" UUID NOT NULL,
    "entertainmentId" UUID NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "totalPerson" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BoatServiceBooking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParasailingBooking" (
    "id" UUID NOT NULL,
    "parasailingId" UUID NOT NULL,
    "entertainmentId" UUID NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "totalPerson" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ParasailingBooking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Entertainment" ADD CONSTRAINT "Entertainment_tripPlanId_fkey" FOREIGN KEY ("tripPlanId") REFERENCES "TripPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HorseRidingBooking" ADD CONSTRAINT "HorseRidingBooking_horseRidingId_fkey" FOREIGN KEY ("horseRidingId") REFERENCES "HorseRiding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HorseRidingBooking" ADD CONSTRAINT "HorseRidingBooking_entertainmentId_fkey" FOREIGN KEY ("entertainmentId") REFERENCES "Entertainment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoatServiceBooking" ADD CONSTRAINT "BoatServiceBooking_boatServiceId_fkey" FOREIGN KEY ("boatServiceId") REFERENCES "BoatService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoatServiceBooking" ADD CONSTRAINT "BoatServiceBooking_entertainmentId_fkey" FOREIGN KEY ("entertainmentId") REFERENCES "Entertainment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParasailingBooking" ADD CONSTRAINT "ParasailingBooking_parasailingId_fkey" FOREIGN KEY ("parasailingId") REFERENCES "Parasailing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParasailingBooking" ADD CONSTRAINT "ParasailingBooking_entertainmentId_fkey" FOREIGN KEY ("entertainmentId") REFERENCES "Entertainment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
