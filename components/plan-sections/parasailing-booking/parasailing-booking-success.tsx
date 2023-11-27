"use client";

import { useRouter } from "next/navigation";
import { TripLocation } from "@prisma/client";

import { Button } from "@/components/ui/button";

interface ParasailingBookingSuccessProps {
  tripId: string;
  tripLocation: TripLocation;
}

export default function ParasailingBookingSuccess({
  tripId,
  tripLocation,
}: ParasailingBookingSuccessProps) {
  const router = useRouter();

  return (
    <div className="flex h-[70vh] flex-col items-center justify-center gap-5">
      <div className="mt-6 rounded-lg border-2 border-solid border-black px-[10vw] py-[10vh] text-center">
        <h1 className="mb-6 text-5xl">Success!</h1>
        <p className="mb-4 text-3xl">Your reservation is done!</p>
      </div>
      <div className="flex justify-center gap-10">
        <Button
          onClick={() =>
            router.push(
              `/hotel?tripId=${tripId}&location=${tripLocation?.toLowerCase()}`
            )
          }
          className="mt-5 w-[12rem] rounded-[0.625rem] bg-[#00A651] text-white"
        >
          Book a Hotel
        </Button>
        <Button
          onClick={() =>
            router.push(
              `/restaurant?tripId=${tripId}&location=${tripLocation?.toLowerCase()}`
            )
          }
          className="mt-5 w-[12rem] rounded-[0.625rem] bg-[#00A651] text-white"
        >
          Pick a Restaurant
        </Button>
        <Button
          onClick={() =>
            router.push(
              `/entertainment?tripId=${tripId}&location=${tripLocation?.toLowerCase()}`
            )
          }
          className="mt-5 w-[12rem] rounded-[0.625rem] bg-[#00A651] text-white"
        >
          Pick an Entertainment
        </Button>
      </div>
      <div className="flex justify-center">
        <Button
          onClick={() => router.push("/traveller-dashboard")}
          className="mt-5 w-[12rem] rounded-[0.625rem] bg-[#00A651] text-white"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
