"use client";

import { useState } from "react";

import { Progress } from "@/components/ui/progress";

import HorseRidingInfoForm from "./horse-riding-info-form";
import HorseRidingSuccessForm from "./horse-riding-success";

export default function HorseRidingFormController() {
  const [progress, setProgress] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  return (
    <section className="container">
      <Progress value={progress} className="mt-10" />
      {page === 0 && (
        <HorseRidingInfoForm setPage={setPage} setProgress={setProgress} />
      )}
      {page === 1 && <HorseRidingSuccessForm />}
    </section>
  );
}
