import {
  BoatService,
  BoatServiceBooking,
  HorseRiding,
  HorseRidingBooking,
  HotelBooking,
  HotelService,
  ParasailingBooking,
  TravelInformation,
  TripPlan,
} from "@prisma/client";

import { RestaurantBookingInfo } from "./restaurant";

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
  restaurantBooking: RestaurantBookingInfo | null;
  boatServiceBooking:
    | (BoatServiceBooking & {
        boatService: BoatService;
      })[]
    | null;
  parasailingBooking:
    | (ParasailingBooking & {
        parasailing: BoatService;
      })[]
    | null;
  horseRidingBooking:
    | (HorseRidingBooking & {
        horseRiding: HorseRiding;
      })[]
    | null;
};
