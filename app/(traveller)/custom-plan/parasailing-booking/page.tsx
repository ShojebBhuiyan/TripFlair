import { TripLocation } from "@prisma/client";

import { ParasailingBookingInfo } from "@/types/parasailing";
import ParasailingBookingController from "@/components/plan-sections/parasailing-booking/parasailing-booking-controller";

async function fetchParasailingBookingInfo(
  parasailingId: string,
  tripId: string
): Promise<ParasailingBookingInfo> {
  const res = await fetch(
    "http://localhost:3000/api/business/get-parasailing-booking-info",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ parasailingId: parasailingId, tripId: tripId }),
    }
  );
  const data: ParasailingBookingInfo = await res.json();
  return data;
}

export default async function BoatBookingPage({
  searchParams,
}: {
  searchParams: {
    location: string;
    tripId: string;
    parasailingId: string;
  };
}) {
  const parasailingBookingInfo = await fetchParasailingBookingInfo(
    searchParams.parasailingId,
    searchParams.tripId
  );
  return (
    <ParasailingBookingController
      parasailingBookingInfo={parasailingBookingInfo}
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
