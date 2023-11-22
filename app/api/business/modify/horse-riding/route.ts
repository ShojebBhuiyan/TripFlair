import { NextRequest } from "next/server";
import { TripLocation } from "@prisma/client";

import prismaClient from "@/lib/prisma-client";

type RequestBody = {
  userId: string;
  horseRidingId: string;
  name: string;
  subtitle: string;
  overview: string;
  location: TripLocation;
  address: string;
  mapLink: string;
  price: number;
  checkInPolicy: string;
  bookingPolicy: string;
  contactNumber: string;
  imageUrls: string[];
};

export async function POST(request: NextRequest) {
  const body: RequestBody = await request.json();

  try {
    const horseRiding = await prismaClient.horseRiding.create({
      data: {
        business: {
          connect: {
            userId: body.userId,
          },
        },
        id: body.horseRidingId,
        name: body.name,
        subtitle: body.subtitle,
        overview: body.overview,
        location: body.location,
        address: body.address,
        mapLink: body.mapLink,
        price: body.price,
        contactNumber: body.contactNumber,
        imageUrls: body.imageUrls,
      },
    });

    return new Response(JSON.stringify(horseRiding), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
