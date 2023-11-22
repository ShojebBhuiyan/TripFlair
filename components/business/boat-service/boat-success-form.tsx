"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function BoatSuccessForm() {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center gap-5">
      <h1 className="text-4xl">Success!</h1>
      <p className="text-3xl">Your boat has been added!</p>
      <Button className="mt-5 rounded-[0.625rem] bg-[#00A651] text-black">
        <Link href="/business/dashboard">Go to Dashboard</Link>
      </Button>
    </div>
  );
}
