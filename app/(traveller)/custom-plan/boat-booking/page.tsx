import { TripLocation } from "@prisma/client";

import { BoatBookingInfo } from "@/types/entertainment";
import BoatBookingController from "@/components/plan-sections/boat-booking/boat-booking-controller";

async function fetchBoatBookingInfo(
  boatId: string,
  tripId: string
): Promise<BoatBookingInfo> {
  const res = await fetch(
    "http://localhost:3000/api/business/get-boat-booking-info",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ boatId: boatId, tripId: tripId }),
    }
  );
  const data: BoatBookingInfo = await res.json();
  return data;
}

export default async function BoatBookingPage({
  searchParams,
}: {
  searchParams: {
    location: string;
    tripId: string;
    boatId: string;
  };
}) {
  const boatBookingInfo = await fetchBoatBookingInfo(
    searchParams.boatId,
    searchParams.tripId
  );
  return (
    <BoatBookingController
      boatBookingInfo={boatBookingInfo}
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
