"use client";

import Link from "next/link";
import { ProfileType } from "@prisma/client";

import { Button } from "../ui/button";

interface SignInTypeFormProps {
  setProfileType: (profileType: ProfileType) => void;
  setPage: (page: number) => void;
}

export default function SignInTypeForm({
  setProfileType,
  setPage,
}: SignInTypeFormProps) {
  return (
    <div className="h-full w-1/2  bg-[#D9D9D980]/50">
      <div className="container flex h-full flex-col items-center justify-center gap-10">
        <h1 className="text-center text-4xl font-bold text-black">
          Select your profile type!
        </h1>
        <div className="flex w-full justify-center gap-5">
          <Button
            className="rounded-[0.625rem] bg-[#00A651BA]/75 text-black hover:rounded-full"
            onClick={() => {
              setPage(1);
              setProfileType(ProfileType.Traveller);
            }}
          >
            Traveller
          </Button>
          <Button
            className="rounded-[0.625rem] bg-[#00A651BA]/75 text-black hover:rounded-full"
            onClick={() => {
              setPage(1);
              setProfileType(ProfileType.Business);
            }}
          >
            Business
          </Button>
        </div>
        <div className="flex gap-2">
          <h3 className="text-lg">Don&apos; have an account?</h3>
          <Link href={"/signup"} className="text-xl text-black underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
