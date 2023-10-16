import prismaClient from "@/lib/prisma-client";

type RequestBody = {
  email: string;
};

export async function POST(req: Request) {
  const body: RequestBody = await req.json();

  try {
    const business = await prismaClient.user.findUnique({
      where: { email: body.email },
      select: {
        business: {
          select: {
            onBoarded: true,
            boatService: true,
            horseRiding: true,
            hotelService: true,
            restaurantService: true,
            parasailing: true,
          },
        },
      },
    });

    if (business) {
      return new Response(JSON.stringify(business.business), {
        status: 200,
        statusText: "OK",
      });
    } else {
      return new Response("Business Not Found!", {
        status: 404,
        statusText: "Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    return new Response("Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
