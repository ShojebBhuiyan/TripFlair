import { NextRequest } from "next/server";

import prismaClient from "@/lib/prisma-client";

type RequestBody = {
  restaurantId: string;
};

export async function POST(request: NextRequest) {
  const body: RequestBody = await request.json();

  try {
    const restaurant = await prismaClient.restaurantService.findUnique({
      where: {
        id: body.restaurantId,
      },
      include: {
        menuItems: true,
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
