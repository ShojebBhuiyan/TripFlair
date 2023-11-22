"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function HorseRidingSuccessForm() {
  const router = useRouter();
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center gap-5">
      <h1 className="text-4xl">Success!</h1>
      <p className="text-3xl">Your horse riding service has been added!</p>
      <Button
        onClick={() => router.push("/business/dashboard")}
        className="mt-5 rounded-[0.625rem] bg-[#00A651] text-black"
      >
        Go to Dashboard
      </Button>
    </div>
  );
}
