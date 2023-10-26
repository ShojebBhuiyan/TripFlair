import prismaClient from "@/lib/prisma-client";

type RequestBody = {
  userId: string;
  hotelId: string;
  tripId: string;
  hotelRoomType: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  checkInDate: string;
  checkOutDate: string;
  totalRoom: number;
  cost: number;
};

export async function POST(req: Request) {
  const body: RequestBody = await req.json();
  console.log(body);

  try {
    const hotelBooking = await prismaClient.hotelBooking.create({
      data: {
        hotelService: {
          connect: {
            id: body.hotelId,
          },
        },
        tripPlan: {
          connect: {
            id: body.tripId,
          },
        },
        hotelRoomType: body.hotelRoomType,
        firstName: body.firstName,
        lastName: body.lastName,
        phoneNumber: body.phoneNumber,
        checkinDate: body.checkInDate,
        checkoutDate: body.checkOutDate,
        totalRoom: body.totalRoom,
        cost: body.cost,
      },
    });

    if (hotelBooking) {
      return new Response(JSON.stringify(hotelBooking), {
        status: 200,
        statusText: "OK",
      });
    } else {
      return new Response("Hotel Booking Not Created!", {
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
