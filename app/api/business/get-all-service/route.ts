import { TripLocation } from "@prisma/client";

import { EntertainmentType } from "@/types/entertainment";
import prismaClient from "@/lib/prisma-client";

type RequestBody = {
  location: TripLocation;
};

export async function POST(req: Request) {
  const body: RequestBody = await req.json();

  try {
    const boatService = await prismaClient.boatService.findMany({
      where: { location: body.location },
    });

    const horseRiding = await prismaClient.horseRiding.findMany({
      where: { location: body.location },
    });

    const parasailing = await prismaClient.parasailing.findMany({
      where: { location: body.location },
    });

    const entertainment: EntertainmentType = {
      boatService,
      horseRiding,
      parasailing,
    };

    return new Response(JSON.stringify(entertainment), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
