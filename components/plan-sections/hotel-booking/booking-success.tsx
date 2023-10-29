"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { TripLocation } from "@prisma/client";

import { Button } from "../../ui/button";

interface BookingSuccessProps {
  tripId: string;
  tripLocation: TripLocation;
}

export default function BookingSuccess({
  tripId,
  tripLocation,
}: BookingSuccessProps) {
  const router = useRouter();
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center gap-5">
      <p className="w-2/3 text-2xl">
        If you do not receive a confirmation message within next five minutes
        contact us at +8801754696365
      </p>
      <div className="mt-6 rounded-lg border-2 border-solid border-black px-[10vw] py-[10vh] text-center">
        <h1 className="mb-6 text-5xl">Success!</h1>
        <p className="mb-4 text-3xl">Your booking is done!</p>
      </div>
      <div className="flex justify-around gap-5">
        <Button
          onClick={() => router.push("/traveller-dashboard")}
          className="mt-5 rounded-[0.625rem] bg-[#00A651] text-white"
        >
          Go to Dashboard
        </Button>
        <Button
          onClick={() =>
            router.push(
              `/restaurant?tripId=${tripId}&location=${tripLocation.toLowerCase()}`
            )
          }
          className="mt-5 rounded-[0.625rem] bg-[#00A651] text-white"
        >
          Pick a Restaurant
        </Button>
      </div>
    </div>
  );
}
