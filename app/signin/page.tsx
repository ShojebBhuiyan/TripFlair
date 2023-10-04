import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import SignInForm from "@/components/signin-form";

import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function SigninPage() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/location");
  return (
    <section className="h-screen bg-bike bg-cover bg-no-repeat">
      <div className="flex h-full items-center justify-end">
        <SignInForm />
      </div>
    </section>
  );
}
