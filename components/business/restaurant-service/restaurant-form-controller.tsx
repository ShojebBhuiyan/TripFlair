"use client";

import { useState } from "react";

import { Progress } from "@/components/ui/progress";

export default function RestaurantFormController() {
  const [progress, setProgress] = useState<number>(0);
  const [page, setPage] = useState<number>(0);

  <section className="container">
    <Progress value={progress} />
  </section>;
}
