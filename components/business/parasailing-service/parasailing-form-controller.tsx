"use client";

import { useState } from "react";

import { Progress } from "@/components/ui/progress";

import ParasailingInfoForm from "./parasailing-info-form";
import ParasailingSuccessForm from "./parasailing-success-form";

export default function ParasailingFormController() {
  const [progress, setProgress] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  return (
    <section className="container">
      <Progress value={progress} className="mt-10" />
      {page === 0 && (
        <ParasailingInfoForm setPage={setPage} setProgress={setProgress} />
      )}
      {page === 1 && <ParasailingSuccessForm />}
    </section>
  );
}
