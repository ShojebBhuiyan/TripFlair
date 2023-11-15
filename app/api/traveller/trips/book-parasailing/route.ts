import prismaClient from "@/lib/prisma-client";

type RequestBody = {
  userId: string;
  parasailingId: string;
  tripId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  reservationDateTime: string;
  packageDescription: string;
  totalPerson: number;
  cost: number;
  tripDay: number;
};

export async function POST(req: Request) {
  const body: RequestBody = await req.json();
  console.log(body);

  try {
    const parasailingBooking = await prismaClient.parasailingBooking.create({
      data: {
        parasailing: {
          connect: {
            id: body.parasailingId,
          },
        },
        tripPlan: {
          connect: {
            id: body.tripId,
          },
        },
        reservationDateTime: body.reservationDateTime,
        totalPerson: body.totalPerson,
        cost: body.cost,
        tripDay: body.tripDay,
        firstName: body.firstName,
        lastName: body.lastName,
        phoneNumber: body.phoneNumber,
        packageDescription: body.packageDescription,
      },
    });

    if (parasailingBooking) {
      return new Response(JSON.stringify(parasailingBooking), {
        status: 200,
        statusText: "OK",
      });
    } else {
      return new Response("Parasailing Booking Not Created!", {
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
