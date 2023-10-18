import PlanForm from "@/components/plan-sections/plan-form";

export default function CustomPlanPage({
  searchParams,
}: {
  searchParams: { [location: string]: string };
}) {
  const tripLocation = searchParams.location;

  return <PlanForm tripLocation={tripLocation} />;
}
