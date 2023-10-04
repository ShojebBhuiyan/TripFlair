"use client";

import { useState } from "react";
import { usePlan } from "@/providers/plan-provider";

import LocationForm from "./location-form";
import TravelInfoForm from "./travel-info-form";
import TravelModeForm from "./travel-mode-form";

export default function PlanForm() {
  const planContext = usePlan();

  return (
    <section className="container">
      {planContext?.planPage === 0 && <LocationForm />}
      {planContext?.planPage === 1 && <TravelModeForm />}
      {planContext?.planPage === 2 && <TravelInfoForm />}
    </section>
  );
}
