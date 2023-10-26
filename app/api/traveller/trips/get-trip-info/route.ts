import prismaClient from "@/lib/prisma-client";

type RequestBody = {
  tripId: string;
};

export async function POST(req: Request) {
  const body: RequestBody = await req.json();

  try {
    const trip = await prismaClient.tripPlan.findUnique({
      where: {
        id: body.tripId,
      },
      include: {
        travelInformation: true,
        hotelBooking: {
          include: {
            hotelService: true,
          },
        },
      },
    });

    console.log(trip);

    if (trip) {
      return new Response(JSON.stringify(trip), {
        status: 200,
        statusText: "OK",
      });
    } else {
      return new Response("Trip Not Found!", {
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
