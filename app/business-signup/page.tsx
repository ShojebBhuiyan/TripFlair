import PlanProvider from "@/providers/plan-provider";

import PlanForm from "@/components/plan-sections/plan-form";
import BusinessFormController from "@/components/signup-form/business/business-form-controller";

export default async function BusinessSignupPage() {
  return (
    <section className="container">
      <BusinessFormController />
    </section>
  );
}
