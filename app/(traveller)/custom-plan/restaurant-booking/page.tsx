import { TripLocation } from "@prisma/client";

import RestaurantBookingController from "@/components/plan-sections/restaurant-booking/restaurant-booking-controller";

export default async function RestaurantBookingPage({
  searchParams,
}: {
  searchParams: {
    restaurantId: string;
    tripId: string;
    location: string;
  };
}) {
  return (
    <RestaurantBookingController
      restaurantId={searchParams.restaurantId}
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
