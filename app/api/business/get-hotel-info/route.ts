import { NextRequest } from "next/server";
import { TripLocation } from "@prisma/client";

import prismaClient from "@/lib/prisma-client";

type RequestBody = {
  hotelId: string;
};

export async function POST(request: NextRequest) {
  const body: RequestBody = await request.json();

  try {
    const hotel = await prismaClient.hotelService.findUnique({
      where: {
        id: body.hotelId,
      },
      include: {
        hotelRooms: true,
      },
    });
    return new Response(JSON.stringify(hotel), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
