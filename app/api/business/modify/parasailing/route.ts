import { NextRequest } from "next/server";
import { TripLocation } from "@prisma/client";

import { ParasailingPackageType } from "@/types/parasailing";
import prismaClient from "@/lib/prisma-client";

type RequestBody = {
  userId: string;
  parasailingId: string;
  name: string;
  subtitle: string;
  overview: string;
  location: TripLocation;
  address: string;
  mapLink: string;
  imageUrls: string[];
  packages: ParasailingPackageType[];
  contactNumber: string;
};

export async function POST(request: NextRequest) {
  const body: RequestBody = await request.json();

  console.log(body);
  try {
    const parasailing = await prismaClient.parasailing.create({
      data: {
        business: {
          connect: {
            userId: body.userId,
          },
        },
        id: body.parasailingId,
        address: body.address,
        contactNumber: body.contactNumber,
        location: body.location,
        name: body.name,
        subtitle: body.subtitle,
        overview: body.overview,
        imageUrls: body.imageUrls,
        parasailingPackages: {
          createMany: {
            data: body.packages,
          },
        },
      },
    });

    console.log(parasailing);
    return new Response(JSON.stringify(parasailing), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
