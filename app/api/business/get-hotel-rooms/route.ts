import { NextRequest } from "next/server";

import prismaClient from "@/lib/prisma-client";

type GetHotelRoomsRequestBody = {
  hotelId: string;
};

export async function POST(request: NextRequest) {
  const body: GetHotelRoomsRequestBody = await request.json();

  try {
    const hotelRooms = await prismaClient.hotelRoom.findMany({
      where: {
        hotelId: body.hotelId,
      },
    });
    return new Response(JSON.stringify(hotelRooms), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
