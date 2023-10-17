import { RestaurantMenuItem } from "@prisma/client";

export type MenuItem = Pick<RestaurantMenuItem, "name" | "price">;
