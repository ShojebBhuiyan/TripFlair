import Link from "next/link";
import { HorseRiding, TripLocation } from "@prisma/client";

import { Button } from "@/components/ui/button";
import HorseCards from "@/components/plan-sections/horse-booking/horse-cards";

async function fetchHorseRidingServices(
  tripLocation: TripLocation
): Promise<HorseRiding[]> {
  console.log(tripLocation);
  const res = await fetch(
    "http://localhost:3000/api/business/get-horse-riding-services",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tripLocation: tripLocation }),
    }
  );
  const data: HorseRiding[] = await res.json();
  console.log(data);
  return data;
}

export default async function BoatServicePage({
  searchParams,
}: {
  searchParams: { tripId: string; location: string };
}) {
  const horses = await fetchHorseRidingServices(
    TripLocation[
      (searchParams.location.charAt(0).toUpperCase() +
        searchParams.location.slice(1)) as keyof typeof TripLocation
    ]
  );

  return (
    <section className="container flex flex-col gap-4 py-10">
      <p className="text-2xl">
        Check out the horse rides we have to offer! We have a wide range of
        horses to choose from, so you can find the perfect one for you!
      </p>
      <div className="flex gap-5 overflow-x-auto">
        {horses.map((horse, index) => (
          <HorseCards tripId={searchParams.tripId} key={index} horse={horse} />
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
