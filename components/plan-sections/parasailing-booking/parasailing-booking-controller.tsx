"use client";

import { useState } from "react";
import { TripLocation } from "@prisma/client";

import { ParasailingBookingInfo } from "@/types/parasailing";

import ParasailingBookingForm from "./parasailing-booking-form";
import ParasailingBookingSuccess from "./parasailing-booking-success";

interface ParasailingBookingControllerProps {
  parasailingBookingInfo: ParasailingBookingInfo;
  tripId: string;
  tripLocation: TripLocation;
}

export default function ParasailingBookingController({
  parasailingBookingInfo,
  tripId,
  tripLocation,
}: ParasailingBookingControllerProps) {
  const [page, setPage] = useState<number>(0);

  return (
    <section className="container">
      {page === 0 && (
        <ParasailingBookingForm
          parasailingInfo={parasailingBookingInfo}
          tripId={tripId}
          setPage={setPage}
        />
      )}
      {page === 1 && (
        <ParasailingBookingSuccess
          tripId={tripId}
          tripLocation={tripLocation}
        />
      )}
    </section>
  );
}
