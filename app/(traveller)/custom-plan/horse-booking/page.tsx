import { TripLocation } from "@prisma/client";

import { HorseBookingInfo } from "@/types/entertainment";
import HorseBookingController from "@/components/plan-sections/horse-booking/horse-booking-controller";

async function fetchHorseBookingInfo(
  horseRidingId: string,
  tripId: string
): Promise<HorseBookingInfo> {
  const res = await fetch(
    "http://localhost:3000/api/business/get-horse-booking-info",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ horseRidingId: horseRidingId, tripId: tripId }),
    }
  );
  const data: HorseBookingInfo = await res.json();
  return data;
}

export default async function BoatBookingPage({
  searchParams,
}: {
  searchParams: {
    location: string;
    tripId: string;
    horseRidingId: string;
  };
}) {
  const horseBookingInfo = await fetchHorseBookingInfo(
    searchParams.horseRidingId,
    searchParams.tripId
  );
  return (
    <HorseBookingController
      horseBookingInfo={horseBookingInfo}
      tripId={searchParams.tripId}
      tripLocation={
        TripLocation[
          (searchParams.location.charAt(0).toUpperCase() +
            searchParams.location.slice(1)) as keyof typeof TripLocation
        ]
      }
    />
  );
}
