"use client";

import { useState } from "react";
import { TripLocation } from "@prisma/client";

import RestaurantBookingForm from "./restaurant-booking-form";
import RestaurantBookingSuccess from "./restaurant-booking-success";

interface RestaurantBookingControllerProps {
  restaurantId: string;
  tripId: string;
  tripLocation: TripLocation;
}

export default function RestaurantBookingController({
  restaurantId,
  tripId,
  tripLocation,
}: RestaurantBookingControllerProps) {
  const [page, setPage] = useState<number>(0);

  return (
    <section className="container">
      {page === 0 && (
        <RestaurantBookingForm
          restaurantId={restaurantId}
          tripId={tripId}
          setPage={setPage}
        />
      )}
      {page === 1 && (
        <RestaurantBookingSuccess tripId={tripId} tripLocation={tripLocation} />
      )}
    </section>
  );
}
