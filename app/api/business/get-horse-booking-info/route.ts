import { NextRequest } from "next/server";

import prismaClient from "@/lib/prisma-client";

type RequestBody = {
  tripId: string;
  horseRidingId: string;
};

export async function POST(request: NextRequest) {
  const body: RequestBody = await request.json();

  try {
    const travelDates = await prismaClient.travelInformation.findUnique({
      where: {
        tripPlanId: body.tripId,
      },
      select: {
        startDate: true,
        returnDate: true,
      },
    });

    console.log(travelDates);

    const horse = await prismaClient.horseRiding.findUnique({
      where: {
        id: body.horseRidingId,
      },
    });

    const startDate = new Date(travelDates?.startDate!);
    const returnDate = new Date(travelDates?.returnDate!);

    let totalTripDays = Math.floor(
      (returnDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (totalTripDays === 0) totalTripDays = 1;

    const horseBookingInfo = {
      ...horse,
      totalTripDays,
    };

    console.log(horseBookingInfo);

    return new Response(JSON.stringify(horseBookingInfo), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
