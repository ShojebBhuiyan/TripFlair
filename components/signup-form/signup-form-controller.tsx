"use client";

import { useState } from "react";
import { ProfileType } from "@prisma/client";

import SignUpForm from "./signup-form";
import SignupTypeForm from "./signup-type-form";

export default function SignupFormController() {
  const [profileType, setProfileType] = useState<ProfileType | undefined>();
  const [page, setPage] = useState<number>(0);
  return (
    <>
      {page === 0 && (
        <SignupTypeForm setProfileType={setProfileType} setPage={setPage} />
      )}
      {page === 1 && (
        <SignUpForm profileType={profileType!} setPage={setPage} />
      )}
    </>
  );
}
