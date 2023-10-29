"use client";

import { useState } from "react";

import { Progress } from "@/components/ui/progress";

import BoatFinalForm from "./boat-final-form";
import BoatInfoForm from "./boat-info-form";
import BoatSuccessForm from "./boat-success-form";

export default function BoatFormController() {
  const [progress, setProgress] = useState<number>(0);
  const [page, setPage] = useState<number>(0);

  return (
    <section className="container">
      <Progress value={progress} className="mt-10" />
      {page === 0 && (
        <BoatInfoForm setPage={setPage} setProgress={setProgress} />
      )}
      {page === 1 && (
        <BoatFinalForm setPage={setPage} setProgress={setProgress} />
      )}
      {page === 2 && <BoatSuccessForm />}
    </section>
  );
}
