import {
  HotelBooking,
  HotelService,
  RestaurantBooking,
  TravelInformation,
  TripPlan,
} from "@prisma/client";

export type TripResultsType = {
  id: string;
  tripLocation: string;
  travelInformation: {
    startDate: string;
    returnDate: string;
  };
};

export type HotelBookingInfo = HotelBooking & {
  hotelService: HotelService;
};

export type TripPlanType = TripPlan & {
  travelInformation: TravelInformation;
  hotelBooking: HotelBookingInfo | null;
  restaurantInformation: RestaurantBooking | null;
};
