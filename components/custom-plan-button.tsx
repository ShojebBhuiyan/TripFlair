"use client";

import { useRouter } from "next/navigation";

import { Button } from "./ui/button";

interface CustomPlanButtonProps {
  location: string;
}

export default function CustomPlanButton({ location }: CustomPlanButtonProps) {
  const router = useRouter();

  return (
    <Button
      className="h-[69px] w-[285px] rounded-[29px] bg-green-700/80 text-2xl text-white"
      onClick={() => router.push(`/custom-plan?location=${location}`)}
    >
      Next
    </Button>
  );
}
