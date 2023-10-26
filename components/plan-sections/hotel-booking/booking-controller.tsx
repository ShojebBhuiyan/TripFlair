"use client";

import { useState } from "react";
import { HotelRoom } from "@prisma/client";

import BookingForm from "./booking-form";
import BookingSuccess from "./booking-success";

interface BookingFormControllerProps {
  hotelId: string;
  tripId: string;
  hotelRoom: HotelRoom;
}

export default function BookingFormController({
  hotelId,
  tripId,
  hotelRoom,
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
      {page === 1 && <BookingSuccess />}
    </section>
  );
}
