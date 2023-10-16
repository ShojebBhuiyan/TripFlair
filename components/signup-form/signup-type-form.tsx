"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

interface SignupTypeFormProps {
  setPage: (page: number) => void;
}

export default function SignupTypeForm({ setPage }: SignupTypeFormProps) {
  const router = useRouter();

  return (
    <div className="h-full w-1/2  bg-[#D9D9D980]/50">
      <div className="container flex h-full flex-col items-center justify-center gap-10">
        <h1 className="text-center text-4xl font-bold text-black">
          What kind of profile would you like to create?
        </h1>
        <div className="flex w-full justify-center gap-5">
          <Button
            className="rounded-[0.625rem] bg-[#00A651BA]/75 text-black hover:rounded-full"
            onClick={() => {
              setPage(1);
            }}
          >
            Traveller
          </Button>
          <Button
            className="rounded-[0.625rem] bg-[#00A651BA]/75 text-black hover:rounded-full"
            onClick={() => {
              router.push("/business-signup");
            }}
          >
            Business
          </Button>
        </div>
        <div className="flex gap-2">
          <h3 className="text-lg">Already have an account?</h3>
          <Link href={"/signin"} className="text-xl text-black underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}