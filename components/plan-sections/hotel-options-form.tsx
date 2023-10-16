"use client";

import { useState } from "react";
import { usePlan } from "@/providers/plan-provider";

export default function HotelOptionsForm() {
  const planContext = usePlan();
  const [isSelected, setIsSelected] = useState(false);

  return (
    <section className="flex flex-col gap-4 py-10">
      <h1 className="text-4xl">First things first!</h1>
      <p className="text-2xl">
        Let us find out where you would like to stay! Explore each options and
        find out what&apos;s best for you!
      </p>
    </section>
  );
}
