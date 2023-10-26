import { PresentLocation, TravelMode, TripLocation } from "@prisma/client";

import prismaClient from "@/lib/prisma-client";

type RequestBody = {
  userId: string;
  presentLocation: PresentLocation;
  tripLocation: TripLocation;
  travelMode: TravelMode;
  numberOfTravellers: number;
  startDate: string;
  returnDate: string;
  totalCost: number;
};

export async function POST(req: Request) {
  const body: RequestBody = await req.json();

  try {
    const trip = await prismaClient.tripPlan.create({
      data: {
        traveller: {
          connect: {
            userId: body.userId,
          },
        },
        tripLocation: body.tripLocation,
        travelInformation: {
          create: {
            travelMode: body.travelMode,
            numberOfTravellers: body.numberOfTravellers,
            presentLocation: body.presentLocation,
            startDate: body.startDate,
            returnDate: body.returnDate,
            totalCost: body.totalCost,
          },
        },
      },
    });

    if (trip) {
      return new Response(JSON.stringify(trip), {
        status: 200,
        statusText: "OK",
      });
    } else {
      return new Response("Trip Not Created!", {
        status: 404,
        statusText: "Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    return new Response("Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
