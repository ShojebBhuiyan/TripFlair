import { Parasailing, TripLocation } from "@prisma/client";

import ParasailingCards from "@/components/plan-sections/parasailing-booking/parasailing-cards";

async function fetchParasailings(
  tripLocation: TripLocation
): Promise<Parasailing[]> {
  console.log(tripLocation);
  const res = await fetch(
    "http://localhost:3000/api/business/get-parasailing-services",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({ tripLocation: tripLocation }),
    }
  );
  const data: Parasailing[] = await res.json();
  console.log(data);
  return data;
}

export default async function BoatServicePage({
  searchParams,
}: {
  searchParams: { tripId: string; location: string };
}) {
  const parasailings = await fetchParasailings(
    TripLocation[
      (searchParams.location.charAt(0).toUpperCase() +
        searchParams.location.slice(1)) as keyof typeof TripLocation
    ]
  );

  return (
    <section className="container flex flex-col gap-4 py-10">
      <p className="text-2xl">
        Checkout the parasailing services we have to offer! We have a wide range
        of parasailing services to choose from, so you can find the perfect one
        for you!
      </p>
      <div className="flex gap-5 overflow-x-auto">
        {parasailings.map((parasailing, index) => (
          <ParasailingCards
            tripId={searchParams.tripId}
            key={index}
            parasailing={parasailing}
          />
        ))}
      </div>
    </section>
  );
}
