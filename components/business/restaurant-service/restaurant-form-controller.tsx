"use client";

import { useState } from "react";

import { Progress } from "@/components/ui/progress";

import RestaurantInfoForm from "./restaurant-info-form";

export default function RestaurantFormController() {
  const [progress, setProgress] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  return (
    <section className="container">
      <Progress value={progress} />
      {page === 0 && (
        <RestaurantInfoForm setPage={setPage} setProgress={setProgress} />
      )}
    </section>
  );
}
