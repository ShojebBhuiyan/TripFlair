import prismaClient from "@/lib/prisma-client";

type RequestBody = {
  userId: string;
  boatId: string;
  tripId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  reservationDateTime: string;
  totalBoats: number;
  totalCost: number;
  tripDay: number;
};

export async function POST(req: Request) {
  const body: RequestBody = await req.json();
  console.log(body);

  try {
    const boatBooking = await prismaClient.boatServiceBooking.create({
      data: {
        boatService: {
          connect: {
            id: body.boatId,
          },
        },
        tripPlan: {
          connect: {
            id: body.tripId,
          },
        },
        dateTime: body.reservationDateTime,
        totalBoats: body.totalBoats,
        totalCost: body.totalCost,
        tripDay: body.tripDay,
        firstName: body.firstName,
        lastName: body.lastName,
        phoneNumber: body.phoneNumber,
      },
    });

    if (boatBooking) {
      return new Response(JSON.stringify(boatBooking), {
        status: 200,
        statusText: "OK",
      });
    } else {
      return new Response("Boat Booking Not Created!", {
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
