import {
  BoatService,
  HorseRiding,
  HotelService,
  Parasailing,
  RestaurantService,
} from "@prisma/client";

export type BusinessResultsType = {
  horseRiding: HorseRiding[];
  boatService: BoatService[];
  hotelService: HotelService[];
  restaurantService: RestaurantService[];
  parasailing: Parasailing[];
  onBoarded: boolean;
};
