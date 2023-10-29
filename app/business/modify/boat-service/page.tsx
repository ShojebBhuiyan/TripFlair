import BoatFormController from "@/components/business/boat-service/boat-form-controller";
import BoatProvider from "@/components/business/boat-service/boat-provider";

export default function BoatServicePage() {
  return (
    <section className="container">
      <BoatProvider>
        <BoatFormController />
      </BoatProvider>
    </section>
  );
}
