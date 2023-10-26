import { NextRequest } from "next/server";

import prismaClient from "@/lib/prisma-client";

type RequestBody = {
  hotelRoomId: string;
};

export async function POST(request: NextRequest) {
  const body: RequestBody = await request.json();

  try {
    const hotelRoom = await prismaClient.hotelRoom.findUnique({
      where: {
        id: body.hotelRoomId,
      },
    });
    return new Response(JSON.stringify(hotelRoom), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
