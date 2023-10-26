import TravelForm from "@/components/plan-sections/travel-information/travel-form";
import TravelProvider from "@/components/plan-sections/travel-information/travel-provider";

export default function TravelInfoPage({
  searchParams,
}: {
  searchParams: { [location: string]: string };
}) {
  const tripLocation =
    searchParams.location.charAt(0).toUpperCase() +
    searchParams.location.slice(1);

  return (
    <TravelProvider>
      <TravelForm tripLocation={tripLocation} />
    </TravelProvider>
  );
}
