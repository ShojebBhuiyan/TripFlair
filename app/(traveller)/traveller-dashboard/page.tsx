import Link from "next/link";
import { TripLocation } from "@prisma/client";
import { getServerSession } from "next-auth";

import { TripResultsType } from "@/types/trip";
import { Separator } from "@/components/ui/separator";
import DeleteTripButton from "@/components/plan-sections/delete-trip-button";
import PlanTripsButton from "@/components/traveller/plan-trip-button";

import { authOptions } from "../../api/auth/[...nextauth]/options";

async function getTripsData(id: string): Promise<TripResultsType[]> {
  const res = await fetch(
    "http://localhost:3000/api/traveller/trips/get-trips",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({
        userId: id,
      }),
    }
  );

  const data: TripResultsType[] = await res.json();

  console.log(data);
  return data;
}

export default async function TravellerDashboardPage() {
  const session = await getServerSession(authOptions);
  console.log(session);
  const trips = await getTripsData(session?.user?.id!);
  const tripsAvailable = trips.length > 0;

  console.log(trips);
  return (
    <div className="container flex flex-col gap-5 py-10">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-4xl">Traveller Dashboard</h1>
        <p className="text-3xl">Welcome {session?.user?.name}</p>
      </div>

      {tripsAvailable ? (
        <>
          <div>
            <div className="flex justify-between">
              <h2 className="text-4xl">Trips</h2>
              <Link
                href={"/location"}
                className="rounded-lg border border-black px-4 py-2 text-2xl hover:bg-black hover:text-white"
              >
                Plan a new trip
              </Link>
            </div>
            <Separator className="my-5" />
            <div className="flex flex-col gap-5">
              {trips?.map((trip, index) => (
                <div key={index} className="container grid grid-cols-3 gap-5">
                  <h2 className="text-2xl">{`Trip to ${
                    trip.tripLocation === TripLocation.Coxsbazar
                      ? "Cox's Bazar"
                      : trip?.tripLocation
                  }`}</h2>
                  <h2 className="text-2xl">
                    {trip.travelInformation.startDate}
                  </h2>
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/trip/${trip.id}`}>Go to details</Link>
                    <DeleteTripButton tripId={trip.id} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-5 py-10">
          <h2 className="text-4xl">No trips Planned!</h2>
          <PlanTripsButton />
        </div>
      )}
    </div>
  );
}
