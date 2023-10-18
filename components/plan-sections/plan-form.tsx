"use client";

import { useEffect, useState } from "react";
import { usePlan } from "@/providers/plan-provider";
import { TripLocation } from "@prisma/client";

import BookingForm from "./booking-form";
import BookingSuccess from "./booking-success";
import HotelInfo from "./hotel-info";
import HotelOptionsForm from "./hotel-options-form";
import LocationForm from "./location-form";
import TravelInfoForm from "./travel-info-form";
import TravelModeForm from "./travel-mode-form";

interface PlanFormProps {
  tripLocation: string;
}

export default function PlanForm({ tripLocation }: PlanFormProps) {
  const planContext = usePlan();

  console.log(tripLocation);

  planContext?.setTripLocation(
    TripLocation[tripLocation as keyof typeof TripLocation]
  );

  planContext?.setNumberOfTravellers(1000);

  // console.log(planContext?.tripLocation);
  return (
    <section className="container">
      {planContext?.planPage === 0 && <LocationForm />}
      {planContext?.planPage === 1 && <TravelModeForm />}
      {planContext?.planPage === 2 && <TravelInfoForm />}
      {planContext?.planPage === 3 && <HotelOptionsForm />}
      {planContext?.planPage === 4 && <HotelInfo />}
      {planContext?.planPage === 5 && <BookingForm />}
      {planContext?.planPage === 6 && <BookingSuccess />}
      {/* {planContext?.planPage === 6 && } */}
    </section>
  );
}
