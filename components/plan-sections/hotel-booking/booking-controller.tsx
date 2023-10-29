"use client";

import { useState } from "react";
import { HotelRoom, TripLocation } from "@prisma/client";

import BookingForm from "./booking-form";
import BookingSuccess from "./booking-success";

interface BookingFormControllerProps {
  hotelId: string;
  tripId: string;
  hotelRoom: HotelRoom;
  tripLocation: TripLocation;
}

export default function BookingFormController({
  hotelId,
  tripId,
  hotelRoom,
  tripLocation,
}: BookingFormControllerProps) {
  const [page, setPage] = useState<number>(0);

  return (
    <section className="container">
      {page === 0 && (
        <BookingForm
          hotelRoom={hotelRoom}
          hotelId={hotelId}
          tripId={tripId}
          setPage={setPage}
        />
      )}
      {page === 1 && (
        <BookingSuccess tripId={tripId} tripLocation={tripLocation} />
      )}
    </section>
  );
}
