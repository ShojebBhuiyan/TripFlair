import PlanProvider from "@/providers/plan-provider";

import PlanForm from "@/components/plan-sections/plan-form";

export default function CustomPlanPage() {
  return (
    <PlanProvider>
      <PlanForm />
    </PlanProvider>
  );
}
