import prismaClient from "@/lib/prisma-client";

type RequestBody = {
  tripId: string;
};

export async function POST(req: Request) {
  const body: RequestBody = await req.json();

  try {
    await prismaClient.tripPlan.update({
      where: { id: body.tripId },
      data: { confirmed: true },
    });

    return new Response("Success", {
      status: 200,
      statusText: "OK",
    });
  } catch (error) {
    console.log(error);
    return new Response("Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
