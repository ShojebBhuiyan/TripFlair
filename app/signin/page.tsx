import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import SignInForm from "@/components/signin-form";
import SigninFormController from "@/components/signin-form/signin-form-controller";

import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function SigninPage() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/location");
  return (
    <section className="h-screen bg-bike bg-cover bg-no-repeat">
      <div className="flex h-full items-center justify-end">
        <SigninFormController />
      </div>
    </section>
  );
}
