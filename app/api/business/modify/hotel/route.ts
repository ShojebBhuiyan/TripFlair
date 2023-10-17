import { NextRequest } from "next/server";
import { TripLocation } from "@prisma/client";

import { HotelRoomType } from "@/types/hotel";
import prismaClient from "@/lib/prisma-client";

type ModifyHotelRequestBody = {
  userId: string;
  hotelId: string;
  name: string;
  slogan: string | null;
  location: TripLocation;
  address: string;
  overview: string;
  contactNumber: string;
  checkInTime: string;
  perks: string[];
  imageUrls: string[];
  hotelRooms: HotelRoomType[];
};

export async function POST(request: NextRequest) {
  const body: ModifyHotelRequestBody = await request.json();

  console.log(body);
  try {
    const hotel = await prismaClient.hotelService.create({
      data: {
        business: {
          connect: {
            userId: body.userId,
          },
        },
        id: body.hotelId,
        address: body.address,
        checkInTime: body.checkInTime,
        contactNumber: body.contactNumber,
        location: body.location,
        name: body.name,
        slogan: body.slogan,
        overview: body.overview,
        imageUrls: body.imageUrls,
        perks: body.perks,
        hotelRooms: {
          createMany: {
            data: body.hotelRooms,
          },
        },
      },
    });

    console.log(hotel);
    return new Response(JSON.stringify(hotel), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
