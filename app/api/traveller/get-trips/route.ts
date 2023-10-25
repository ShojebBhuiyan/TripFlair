import prismaClient from "@/lib/prisma-client";

type RequestBody = {
  userId: string;
};

export async function POST(req: Request) {
  const body: RequestBody = await req.json();

  try {
    const trips = await prismaClient.tripPlan.findMany({
      where: {
        traveller: {
          userId: body.userId,
        },
      },
      select: {
        id: true,
        tripLocation: true,
      },
    });

    if (trips) {
      return new Response(JSON.stringify(trips), {
        status: 200,
        statusText: "OK",
      });
    } else {
      return new Response("Trips Not Found!", {
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
