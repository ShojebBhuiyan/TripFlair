import { TripLocation } from "@prisma/client";

import EntertainmentOptions from "@/components/entertainment/entertainment-options";

export default function EntertainmentPage({
  searchParams,
}: {
  searchParams: { tripId: string; location: string };
}) {
  return (
    <section className="container flex h-[80vh] flex-col items-center justify-center gap-20">
      <h1 className="text-center text-4xl">
        What would you like to do in{" "}
        {searchParams.location.charAt(0).toUpperCase() +
          searchParams.location.slice(1) ===
        TripLocation.Coxsbazar
          ? "Cox's Bazar"
          : searchParams?.location}
        ? Checkout the local entertainments!
      </h1>

      <EntertainmentOptions
        tripId={searchParams.tripId}
        location={searchParams.location}
      />
    </section>
  );
}
