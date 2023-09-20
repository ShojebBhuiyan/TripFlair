"use client";

import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

export default function GetStartedButton() {
  const router = useRouter();

  return (
    <Button
      className="bg-transparent text-xl text-white backdrop-blur-sm hover:border hover:border-white hover:bg-transparent"
      onClick={() => router.push("/location")}
    >
      Get Started
    </Button>
  );
}
