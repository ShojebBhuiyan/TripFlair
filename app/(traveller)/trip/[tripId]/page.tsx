import { TripPlanType } from "@/types/trip";
import ConfirmPlanButton from "@/components/plan-sections/confirm-plan-button";
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
  console.log("Inside", data);
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

  const startDate = new Date(tripPlan.travelInformation.startDate);
  const endDate = new Date(tripPlan.travelInformation.returnDate);

  let totalTripDays = Math.floor(
    (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
  );

  if (totalTripDays === 0) totalTripDays = 1;

  // console.log("Outside", tripPlan.boatServiceBooking);
  return (
    <>
      {!isLoading && tripPlan ? (
        <section className="container flex flex-col gap-5 py-10">
          <PlanAccordion tripPlan={tripPlan} totalTripDays={totalTripDays} />
          {tripPlan.confirmed ? (
            <></>
          ) : (
            <div className="flex justify-center">
              <ConfirmPlanButton tripId={params.tripId} />
            </div>
          )}
        </section>
      ) : (
        <>Loading...</>
      )}
    </>
  );
}
