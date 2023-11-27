"use client";

import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

async function confirmPlan(tripId: string) {
  const res = await fetch(
    "http://localhost:3000/api/traveller/trips/confirm-trip",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({
        tripId,
      }),
    }
  );
}

interface ConfirmPlanButtonProps {
  tripId: string;
}

export default function ConfirmPlanButton({ tripId }: ConfirmPlanButtonProps) {
  const router = useRouter();
  return (
    <Button
      className="rounded-[0.625rem] bg-[#00A651BA]/75 text-black hover:rounded-full hover:bg-[#23c16f]"
      onClick={() => {
        confirmPlan(tripId);
        router.refresh();
      }}
    >
      Confirm
    </Button>
  );
}
