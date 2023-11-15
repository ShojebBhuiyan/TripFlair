import { NextRequest } from "next/server";
import { TripLocation } from "@prisma/client";

import prismaClient from "@/lib/prisma-client";

type RequestBody = {
  tripLocation: TripLocation;
};

export async function POST(request: NextRequest) {
  const body: RequestBody = await request.json();

  try {
    const parasailing = await prismaClient.parasailing.findMany({
      where: {
        location: body.tripLocation,
      },
      take: 5,
    });
    return new Response(JSON.stringify(parasailing), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
