"use client";

import { ProfileType } from "@prisma/client";
import { signOut, useSession } from "next-auth/react";

import NavButton from "./nav-button";
import { Button } from "./ui/button";

export default function NavbarAuthButtons() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <>
          <NavButton
            description="Profile"
            href={
              session.user?.profileType === ProfileType.Business
                ? "/business/dashboard"
                : "/travelboard"
            }
            variant="outline"
          />
          <Button
            variant={"default"}
            className="w-[8rem] text-lg"
            onClick={() => {
              signOut();
            }}
          >
            Signout
          </Button>
        </>
      ) : (
        <>
          <NavButton description="Sign In" href="/signin" variant="outline" />
          <NavButton description="Sign Up" href="/signup" variant="default" />
        </>
      )}
    </>
  );
}
