import { NextRequest } from "next/server";

import prismaClient from "@/lib/prisma-client";

type RequestBody = {
  parasailingId: string;
};

export async function POST(request: NextRequest) {
  const body: RequestBody = await request.json();

  try {
    const parasailing = await prismaClient.parasailing.findUnique({
      where: {
        id: body.parasailingId,
      },
      include: {
        parasailingPackages: true,
      },
    });

    return new Response(JSON.stringify(parasailing), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
