"use client";

import { useEffect, useState } from "react";
import { usePlan } from "@/providers/plan-provider";
import { HotelService } from "@prisma/client";

import HotelCards from "./hotel-cards";

export default function HotelOptionsForm() {
  const planContext = usePlan();
  const [hotels, setHotels] = useState<HotelService[]>([]);

  useEffect(() => {
    const fetchHotels = async () => {
      const res = await fetch("/api/business/get-hotels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tripLocation: planContext?.tripLocation }),
      });
      const data: HotelService[] = await res.json();
      setHotels(data);
    };
    fetchHotels();
  }, []);
  return (
    <section className="flex flex-col gap-4 py-10">
      <h1 className="text-4xl">First things first!</h1>
      <p className="text-2xl">
        Let us find out where you would like to stay! Explore each options and
        find out what&apos;s best for you!
      </p>
      <div className="flex gap-5 overflow-x-auto">
        {hotels.map((hotel, index) => (
          <HotelCards key={index} hotel={hotel} />
        ))}
      </div>
    </section>
  );
}
