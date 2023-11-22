import { TripLocation } from "@prisma/client";

import prismaClient from "@/lib/prisma-client";

type RequestBody = {
  location: TripLocation;
};

export async function POST(req: Request) {
  const body: RequestBody = await req.json();

  try {
    const horseRiding = await prismaClient.horseRiding.findMany({
      where: { location: body.location },
    });

    return new Response(JSON.stringify(horseRiding), {
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
