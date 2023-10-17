"use client";

import { useState } from "react";

import { Progress } from "@/components/ui/progress";

import RestaurantInfoForm from "./restaurant-info-form";
import RestaurantMenuForm from "./restaurant-menu-form";
import RestaurantSuccessForm from "./restaurant-success-form";

export default function RestaurantFormController() {
  const [progress, setProgress] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  return (
    <section className="container">
      <Progress value={progress} className="mt-10" />
      {page === 0 && (
        <RestaurantInfoForm setPage={setPage} setProgress={setProgress} />
      )}
      {page === 1 && (
        <RestaurantMenuForm setPage={setPage} setProgress={setProgress} />
      )}
      {page === 2 && <RestaurantSuccessForm />}
    </section>
  );
}
