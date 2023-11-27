"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { Button } from "../ui/button";

async function deleteTrip(tripId: string) {
  const res = await fetch(
    "http://localhost:3000/api/traveller/trips/delete-trip",
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

interface DeleteTripButtonProps {
  tripId: string;
}

export default function DeleteTripButton({ tripId }: DeleteTripButtonProps) {
  const router = useRouter();
  return (
    <Button
      variant={"ghost"}
      onClick={() => {
        deleteTrip(tripId);
        router.refresh();
      }}
    >
      <Trash2 color="#eb0f0f" />
    </Button>
  );
}
