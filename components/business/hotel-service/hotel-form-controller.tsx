"use client";

import { useState } from "react";

import { Progress } from "@/components/ui/progress";

import HotelServiceForm from "./hotel-service-form";
import HotelSuccessForm from "./hotel-success-form";

export default function HotelFormController() {
  const [progress, setProgress] = useState<number>(50);
  const [page, setPage] = useState<number>(0);
  return (
    <section className="container">
      <Progress value={progress} className="mt-10" />
      {page === 0 && (
        <HotelServiceForm setPage={setPage} setProgress={setProgress} />
      )}
      {page === 1 && <HotelSuccessForm />}
    </section>
  );
}
