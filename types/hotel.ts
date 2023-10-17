import { HotelRoom } from "@prisma/client";

export type HotelRoomType = Pick<HotelRoom, "type" | "price">;
