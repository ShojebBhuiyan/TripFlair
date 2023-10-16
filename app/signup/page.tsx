import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import SignupFormController from "@/components/signup-form/signup-form-controller";

import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function SignupPage() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/location");
  return (
    <section className="h-screen bg-bike bg-cover bg-no-repeat">
      <div className="flex h-full items-center justify-end">
        <SignupFormController />
      </div>
    </section>
  );
}
