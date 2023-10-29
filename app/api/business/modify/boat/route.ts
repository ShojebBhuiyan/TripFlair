import { NextRequest } from "next/server";
import { TripLocation } from "@prisma/client";

import prismaClient from "@/lib/prisma-client";

type ModifyBoatRequestBody = {
  userId: string;
  boatId: string;
  title: string;
  overview: string;
  location: TripLocation;
  address: string;
  mapLink: string;
  perks: string[];
  price: number;
  checkInPolicy: string;
  bookingPolicy: string;
  contactNumber: string;
  imageUrls: string[];
};

export async function POST(request: NextRequest) {
  const body: ModifyBoatRequestBody = await request.json();

  try {
    const boat = await prismaClient.boatService.create({
      data: {
        business: {
          connect: {
            userId: body.userId,
          },
        },
        id: body.boatId,
        name: body.title,
        overview: body.overview,
        location: body.location,
        address: body.address,
        mapLink: body.mapLink,
        perks: body.perks,
        price: body.price,
        checkInPolicy: body.checkInPolicy,
        bookingPolicy: body.bookingPolicy,
        contactNumber: body.contactNumber,
        imageUrls: body.imageUrls,
      },
    });

    return new Response(JSON.stringify(boat), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
