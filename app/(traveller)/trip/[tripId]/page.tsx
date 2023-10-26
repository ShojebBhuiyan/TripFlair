import { TripPlanType } from "@/types/trip";
import PlanAccordion from "@/components/plan-sections/plan-accordion";

async function fetchTripPlan(tripId: string): Promise<TripPlanType> {
  const res = await fetch(
    "http://localhost:3000/api/traveller/trips/get-trip-info",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({ tripId: tripId }),
    }
  );
  const data: TripPlanType = await res.json();
  return data;
}

export default async function TripInfo({
  params,
}: {
  params: { tripId: string };
}) {
  let isLoading = true;
  const tripPlan = await fetchTripPlan(params.tripId);
  isLoading = false;

  console.log("Outside", tripPlan);
  return (
    <>
      {!isLoading && tripPlan ? (
        <section className="container flex flex-col gap-5 py-10">
          <PlanAccordion tripPlan={tripPlan} />
        </section>
      ) : (
        <>Loading...</>
      )}
    </>
  );
}
