"use client";

import { useState } from "react";
import { TripLocation } from "@prisma/client";

import { HorseBookingInfo } from "@/types/entertainment";

import HorseBookingForm from "./horse-booking-form";
import HorseBookingSuccess from "./horse-booking-success";

interface HorseBookingControllerProps {
  horseBookingInfo: HorseBookingInfo;
  tripId: string;
  tripLocation: TripLocation;
}

export default function HorseBookingController({
  horseBookingInfo,
  tripId,
  tripLocation,
}: HorseBookingControllerProps) {
  const [page, setPage] = useState<number>(0);

  return (
    <section className="container">
      {page === 0 && (
        <HorseBookingForm
          horseBookingInfo={horseBookingInfo}
          tripId={tripId}
          setPage={setPage}
        />
      )}
      {page === 1 && (
        <HorseBookingSuccess tripId={tripId} tripLocation={tripLocation} />
      )}
    </section>
  );
}
