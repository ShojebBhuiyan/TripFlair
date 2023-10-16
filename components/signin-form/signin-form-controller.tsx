"use client";

import { useState } from "react";
import { ProfileType } from "@prisma/client";

import SignInForm from "./signin-form";
import SignInTypeForm from "./signin-type-form";

export default function SigninFormController() {
  const [profileType, setProfileType] = useState<ProfileType | undefined>();
  const [page, setPage] = useState<number>(0);
  return (
    <>
      {page === 0 && (
        <SignInTypeForm setProfileType={setProfileType} setPage={setPage} />
      )}
      {page === 1 && (
        <SignInForm profileType={profileType!} setPage={setPage} />
      )}
    </>
  );
}
