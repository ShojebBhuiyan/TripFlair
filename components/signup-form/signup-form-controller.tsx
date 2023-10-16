"use client";

import { useState } from "react";
import { ProfileType } from "@prisma/client";

import SignupTypeForm from "./signup-type-form";
import TravellerSignUpForm from "./traveller/traveller-signup-form";

export default function SignupFormController() {
  const [page, setPage] = useState<number>(0);
  return (
    <>
      {page === 0 && <SignupTypeForm setPage={setPage} />}
      {page === 1 && <TravellerSignUpForm setPage={setPage} />}
    </>
  );
}
