"use client";

import { useRouter } from "next/navigation";

import { Button } from "./ui/button";

export default function GetPlanButton() {
  const router = useRouter();

  return (
    <Button
      className="h-[69px] w-[285px] rounded-[29px] bg-green-700/80 text-2xl text-yellow-300"
      onClick={() => router.push("/plan")}
    >
      Get Plan
    </Button>
  );
}
