import prismaClient from "@/lib/prisma-client";

type RequestBody = {
  userId: string;
  horseRidingId: string;
  tripId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateTime: string;
  totalPerson: number;
  totalCost: number;
  tripDay: number;
};

export async function POST(req: Request) {
  const body: RequestBody = await req.json();
  console.log(body);

  try {
    const horseBooking = await prismaClient.horseRidingBooking.create({
      data: {
        horseRiding: {
          connect: {
            id: body.horseRidingId,
          },
        },
        tripPlan: {
          connect: {
            id: body.tripId,
          },
        },
        cost: body.totalCost,
        dateTime: body.dateTime,
        firstName: body.firstName,
        lastName: body.lastName,
        phoneNumber: body.phoneNumber,
        totalPerson: body.totalPerson,
        tripDay: body.tripDay,
      },
    });

    if (horseBooking) {
      return new Response(JSON.stringify(horseBooking), {
        status: 200,
        statusText: "OK",
      });
    } else {
      return new Response("Horse Booking Not Created!", {
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
