import Link from "next/link";
import { BoatService, TripLocation } from "@prisma/client";

import { Button } from "@/components/ui/button";
import BoatCards from "@/components/plan-sections/boat-booking/boat-cards";

async function fetchBoats(tripLocation: TripLocation): Promise<BoatService[]> {
  console.log(tripLocation);
  const res = await fetch("http://localhost:3000/api/business/get-boats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tripLocation: tripLocation }),
  });
  const data: BoatService[] = await res.json();
  console.log(data);
  return data;
}

export default async function BoatServicePage({
  searchParams,
}: {
  searchParams: { tripId: string; location: string };
}) {
  const boats = await fetchBoats(
    TripLocation[
      (searchParams.location.charAt(0).toUpperCase() +
        searchParams.location.slice(1)) as keyof typeof TripLocation
    ]
  );

  return (
    <section className="container flex flex-col gap-4 py-10">
      <p className="text-2xl">
        Check out the boats we have to offer! We have a wide range of boats to
        choose from, so you can find the perfect one for you!
      </p>
      <div className="flex gap-5 overflow-x-auto">
        {boats.map((boat, index) => (
          <BoatCards tripId={searchParams.tripId} key={index} boat={boat} />
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
