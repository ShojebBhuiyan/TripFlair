"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Button } from "../../ui/button";
import { useTravel } from "./travel-provider";

export default function TravelInfoSuccess() {
  const travelContext = useTravel();
  const router = useRouter();
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center gap-5">
      <div className="mt-6 rounded-lg border-2 border-solid border-black px-[10vw] py-[10vh] text-center">
        <h1 className="mb-6 text-5xl">Success!</h1>
        <p className="mb-4 text-3xl">Your travel information is saved!</p>
        <div className="flex justify-center gap-10">
          <Button
            onClick={() =>
              router.push(
                `/hotel?tripId=${
                  travelContext.tripId
                }&location=${travelContext.tripLocation?.toLowerCase()}`
              )
            }
            className="mt-5 rounded-[0.625rem] bg-[#00A651] text-white"
          >
            Book a Hotel
          </Button>
          <Button
            onClick={() =>
              router.push(
                `/restaurant?tripId=${
                  travelContext.tripId
                }&location=${travelContext.tripLocation?.toLowerCase()}`
              )
            }
            className="mt-5 rounded-[0.625rem] bg-[#00A651] text-white"
          >
            Pick a Restaurant
          </Button>
          <Button
            onClick={() =>
              router.push(
                `/entertainment?tripId=${
                  travelContext.tripId
                }&location=${travelContext.tripLocation?.toLowerCase()}`
              )
            }
            className="mt-5 rounded-[0.625rem] bg-[#00A651] text-white"
          >
            Pick an Entertainment
          </Button>
        </div>
        <div className="flex justify-center">
          <Button
            onClick={() => router.push("/traveller-dashboard")}
            className="mt-5 rounded-[0.625rem] bg-[#00A651] text-white"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
