import RestaurantFormController from "@/components/business/restaurant-service/restaurant-form-controller";
import RestaurantProvider from "@/components/business/restaurant-service/restaurant-provider";

export default function RestaurantServicePage() {
  return (
    <section className="container">
      <RestaurantProvider>
        <RestaurantFormController />
      </RestaurantProvider>
    </section>
  );
}
