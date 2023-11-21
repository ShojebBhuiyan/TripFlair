import { NextRequest } from "next/server";

import prismaClient from "@/lib/prisma-client";

type RequestBody = {
  tripId: string;
  parasailingId: string;
};

export async function POST(request: NextRequest) {
  const body: RequestBody = await request.json();
  console.log(body.tripId);

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

    const parasailing = await prismaClient.parasailing.findUnique({
      where: {
        id: body.parasailingId,
      },
      include: {
        parasailingPackages: true,
      },
    });

    console.log(parasailing);

    const startDate = new Date(travelDates?.startDate!);
    const returnDate = new Date(travelDates?.returnDate!);

    let totalTripDays = Math.floor(
      (returnDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (totalTripDays === 0) totalTripDays = 1;

    const parasailingBookingInfo = {
      ...parasailing,
      totalTripDays,
    };

    console.log(parasailingBookingInfo);

    return new Response(JSON.stringify(parasailingBookingInfo), {
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
