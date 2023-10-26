"use client";

import { TripLocation } from "@prisma/client";

import LocationForm from "./location-form";
import TravelInfoForm from "./travel-info-form";
import TravelInfoSuccess from "./travel-info-success-form";
import TravelModeForm from "./travel-mode-form";
import TravelProvider, { useTravel } from "./travel-provider";

interface TravelFormProps {
  tripLocation: string;
}

export default function TravelForm({ tripLocation }: TravelFormProps) {
  const travelContext = useTravel();

  console.log(tripLocation);

  travelContext?.setTripLocation(
    TripLocation[tripLocation as keyof typeof TripLocation]
  );

  return (
    <section className="container">
      {travelContext.page === 0 && <LocationForm />}
      {travelContext.page === 1 && <TravelModeForm />}
      {travelContext.page === 2 && <TravelInfoForm />}
      {travelContext.page === 3 && <TravelInfoSuccess />}
    </section>
  );
}
