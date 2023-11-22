"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { Button } from "../ui/button";

async function deleteService(
  serviceId: string,
  serviceMode: "boat" | "hotel" | "restaurant" | "horse" | "parasailing"
) {
  const res = await fetch("http://localhost:3000/api/business/delete-service", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({
      serviceId,
      serviceMode,
    }),
  });
}

interface DeleteBusinessButtonProps {
  serviceId: string;
  serviceMode: "boat" | "hotel" | "restaurant" | "horse" | "parasailing";
}

export default function DeleteBusinessButton({
  serviceId,
  serviceMode,
}: DeleteBusinessButtonProps) {
  const router = useRouter();
  return (
    <Button
      variant={"ghost"}
      onClick={() => {
        deleteService(serviceId, serviceMode);
        router.refresh();
      }}
    >
      <Trash2 color="#eb0f0f" />
    </Button>
  );
}
