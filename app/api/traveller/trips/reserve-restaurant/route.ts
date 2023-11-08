import prismaClient from "@/lib/prisma-client";

type RequestBody = {
  userId: string;
  restaurantId: string;
  tripId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  reservationDateTime: string;
  totalSeats: number;
  estimatedBudget: number;
};

export async function POST(req: Request) {
  const body: RequestBody = await req.json();
  console.log(body);

  try {
    const restaurantBooking = await prismaClient.restaurantBooking.create({
      data: {
        restaurant: {
          connect: {
            id: body.restaurantId,
          },
        },
        tripPlan: {
          connect: {
            id: body.tripId,
          },
        },
        firstName: body.firstName,
        lastName: body.lastName,
        phoneNumber: body.phoneNumber,
        dateTime: body.reservationDateTime,
        totalSeat: body.totalSeats,
        estimatedBudget: body.estimatedBudget,
      },
    });

    if (restaurantBooking) {
      return new Response(JSON.stringify(restaurantBooking), {
        status: 200,
        statusText: "OK",
      });
    } else {
      return new Response("Restaurant Booking Not Created!", {
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
