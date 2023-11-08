"use client";

import { useState } from "react";
import { TripLocation } from "@prisma/client";

import { BoatBookingInfo } from "@/types/entertainment";

import BoatBookingForm from "./boat-booking-form";
import BoatBookingSuccess from "./boat-booking-success";

interface BoatBookingControllerProps {
  boatBookingInfo: BoatBookingInfo;
  tripId: string;
  tripLocation: TripLocation;
}

export default function BoatBookingController({
  boatBookingInfo,
  tripId,
  tripLocation,
}: BoatBookingControllerProps) {
  const [page, setPage] = useState<number>(0);

  return (
    <section className="container">
      {page === 0 && (
        <BoatBookingForm
          boatBookingInfo={boatBookingInfo}
          tripId={tripId}
          setPage={setPage}
        />
      )}
      {page === 1 && (
        <BoatBookingSuccess tripId={tripId} tripLocation={tripLocation} />
      )}
    </section>
  );
}
