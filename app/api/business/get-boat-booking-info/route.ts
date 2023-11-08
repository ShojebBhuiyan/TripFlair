import { NextRequest } from "next/server";

import prismaClient from "@/lib/prisma-client";

type RequestBody = {
  tripId: string;
  boatId: string;
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

    const boatService = await prismaClient.boatService.findUnique({
      where: {
        id: body.boatId,
      },
    });

    const startDate = new Date(travelDates?.startDate!);
    const returnDate = new Date(travelDates?.returnDate!);

    const totalTripDays = Math.floor(
      (returnDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    const boatBookingInfo = {
      ...boatService,
      totalTripDays,
    };

    console.log(boatBookingInfo);

    return new Response(JSON.stringify(boatBookingInfo), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
