import { NextRequest } from "next/server";
import { TripLocation } from "@prisma/client";

import { MenuItem } from "@/types/restaurant";
import prismaClient from "@/lib/prisma-client";

type ModifyRestaurantRequestBody = {
  userId: string;
  restaurantId: string;
  name: string;
  location: TripLocation;
  address: string;
  slogan: string | null;
  description: string;
  contactNumber: string;
  imageUrls: string[];
  menuItems: MenuItem[];
};

export async function POST(request: NextRequest) {
  const body: ModifyRestaurantRequestBody = await request.json();

  try {
    const restaurant = await prismaClient.restaurantService.create({
      data: {
        business: {
          connect: {
            userId: body.userId,
          },
        },
        id: body.restaurantId,
        name: body.name,
        location: body.location,
        address: body.address,
        slogan: body.slogan,
        description: body.description,
        contactNumber: body.contactNumber,
        imageUrls: body.imageUrls,
        menuItems: {
          createMany: {
            data: body.menuItems,
          },
        },
      },
    });

    return new Response(JSON.stringify(restaurant), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
