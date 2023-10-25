import { getServerSession } from "next-auth";

import { TripResultsType } from "@/types/trip";
import { Separator } from "@/components/ui/separator";
import PlanTripsButton from "@/components/traveller/plan-trip-button";

import { authOptions } from "../../api/auth/[...nextauth]/options";

async function getTripsData(id: string): Promise<TripResultsType[]> {
  const res = await fetch("http://localhost:3000/api/traveller/get-trips", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: id,
    }),
  });

  const data: TripResultsType[] = await res.json();

  return data;
}

export default async function TravellerPage() {
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
            <h2 className="text-4xl">Trips</h2>
            <Separator className="my-5" />
            <div className="flex flex-col gap-5">
              {trips?.map((trip, index) => (
                <div key={index} className="flex items-center gap-5">
                  <h2 className="text-2xl">{trip.tripLocation}</h2>
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
