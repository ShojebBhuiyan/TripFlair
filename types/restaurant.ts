import {
  RestaurantBooking,
  RestaurantMenuItem,
  RestaurantService,
} from "@prisma/client";

export type MenuItem = Pick<RestaurantMenuItem, "name" | "price">;

export type RestaurantInfo = RestaurantService & {
  menuItems: RestaurantMenuItem[];
};

export type RestaurantBookingInfo = RestaurantBooking & {
  restaurant: RestaurantService;
};
