"use client";

import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

export default function RegisterBusinessButton() {
  const router = useRouter();
  return (
    <Button
      className="mt-5 w-fit justify-center rounded-[0.625rem] bg-[#00A651] text-black"
      onClick={() => {
        router.push("/business/modify");
      }}
    >
      Register New Business
    </Button>
  );
}
