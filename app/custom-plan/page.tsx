import { redirect } from "next/navigation";
import PlanProvider from "@/providers/plan-provider";
import { getServerSession } from "next-auth";

import PlanForm from "@/components/plan-sections/plan-form";

import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function CustomPlanPage({
  searchParams,
}: {
  searchParams: { [location: string]: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");
  return (
    <PlanProvider planLocation={searchParams.location}>
      <PlanForm />
    </PlanProvider>
  );
}
