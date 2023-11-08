import { NextRequest } from "next/server";

import prismaClient from "@/lib/prisma-client";

type RequestBody = {
  boatId: string;
};

export async function POST(request: NextRequest) {
  const body: RequestBody = await request.json();

  try {
    const boatService = await prismaClient.boatService.findUnique({
      where: {
        id: body.boatId,
      },
    });
    return new Response(JSON.stringify(boatService), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
