-- CreateTable
CREATE TABLE "RestaurantBooking" (
    "id" UUID NOT NULL,
    "restaurantId" UUID NOT NULL,
    "tripPlanId" UUID NOT NULL,
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

    CONSTRAINT "RestaurantBooking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantBooking_tripPlanId_key" ON "RestaurantBooking"("tripPlanId");

-- AddForeignKey
ALTER TABLE "RestaurantBooking" ADD CONSTRAINT "RestaurantBooking_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "RestaurantService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RestaurantBooking" ADD CONSTRAINT "RestaurantBooking_tripPlanId_fkey" FOREIGN KEY ("tripPlanId") REFERENCES "TripPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
