import Link from "next/link";
import { RestaurantService, TripLocation } from "@prisma/client";

import { Button } from "@/components/ui/button";
import RestaurantCards from "@/components/plan-sections/restaurant-booking/restaurant-cards";

async function fetchRestaurants(
  tripLocation: TripLocation
): Promise<RestaurantService[]> {
  const res = await fetch(
    "http://localhost:3000/api/business/get-restaurants",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({ tripLocation: tripLocation }),
    }
  );
  const data: RestaurantService[] = await res.json();
  return data;
}

export default async function HotelPage({
  searchParams,
}: {
  searchParams: { location: string; tripId: string };
}) {
  const restaurants = await fetchRestaurants(
    TripLocation[
      (searchParams.location.charAt(0).toUpperCase() +
        searchParams.location.slice(1)) as keyof typeof TripLocation
    ]
  );

  return (
    <section className="container flex flex-col gap-4 py-10">
      <p className="text-2xl">
        Following are the list of restaurants we recommend. These are TripFlair
        verified, so you can count on having a good time!
      </p>
      <div className="flex gap-5 overflow-x-auto">
        {restaurants.map((restaurant, index) => (
          <RestaurantCards
            tripId={searchParams.tripId}
            key={index}
            restaurant={restaurant}
          />
        ))}
      </div>
      <div className="flex items-center justify-end">
        <Button>
          <Link href={`/custom-plan/options?tripId=${searchParams.tripId}`}>
            Skip
          </Link>
        </Button>
      </div>
    </section>
  );
}
