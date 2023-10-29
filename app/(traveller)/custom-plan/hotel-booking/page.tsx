import { HotelRoom, TripLocation } from "@prisma/client";

import BookingFormController from "@/components/plan-sections/hotel-booking/booking-controller";

async function fetchRoomInfo(hotelRoomId: string): Promise<HotelRoom> {
  const res = await fetch("http://localhost:3000/api/business/get-hotel-room", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ hotelRoomId }),
  });
  const data: HotelRoom = await res.json();
  return data;
}

export default async function HotelBookingPage({
  searchParams,
}: {
  searchParams: {
    hotelId: string;
    tripId: string;
    hotelRoomId: string;
    location: string;
  };
}) {
  const room = await fetchRoomInfo(searchParams.hotelRoomId);
  console.log(room);

  return (
    <BookingFormController
      hotelRoom={room}
      hotelId={searchParams.hotelId}
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
