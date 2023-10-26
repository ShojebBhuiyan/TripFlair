import { HotelService, TripLocation } from "@prisma/client";

import HotelCards from "@/components/plan-sections/hotel-cards";

async function fetchHotels(
  tripLocation: TripLocation
): Promise<HotelService[]> {
  const res = await fetch("http://localhost:3000/api/business/get-hotels", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tripLocation: tripLocation }),
  });
  const data: HotelService[] = await res.json();
  return data;
}

export default async function HotelPage({
  searchParams,
}: {
  searchParams: { location: string; tripId: string };
}) {
  const hotels = await fetchHotels(
    TripLocation[
      (searchParams.location.charAt(0).toUpperCase() +
        searchParams.location.slice(1)) as keyof typeof TripLocation
    ]
  );

  return (
    <section className="container flex flex-col gap-4 py-10">
      <p className="text-2xl">
        Let us find out where you would like to stay! Explore each options and
        find out what&apos;s best for you!
      </p>
      <div className="flex gap-5 overflow-x-auto">
        {hotels.map((hotel, index) => (
          <HotelCards tripId={searchParams.tripId} key={index} hotel={hotel} />
        ))}
      </div>
    </section>
  );
}
