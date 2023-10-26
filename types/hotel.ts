import { HotelRoom, HotelService } from "@prisma/client";

export type HotelRoomType = Pick<HotelRoom, "type" | "price">;

export type HotelInformation = HotelService & {
  hotelRooms: HotelRoom[];
};
