"use client";

import { useRouter } from "next/navigation";

import { Button } from "./ui/button";

export default function SignUpButton() {
  const router = useRouter();

  return (
    <Button variant={"link"} onClick={() => router.push("/signup")}>
      Signup
    </Button>
  );
}
