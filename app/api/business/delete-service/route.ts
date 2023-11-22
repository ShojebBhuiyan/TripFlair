import prismaClient from "@/lib/prisma-client";

type RequestBody = {
  serviceId: string;
  serviceMode: "boat" | "horse" | "hotel" | "restaurant" | "parasailing";
};

export async function POST(req: Request) {
  const body: RequestBody = await req.json();

  try {
    if (body.serviceMode === "boat") {
      await prismaClient.boatService.delete({
        where: { id: body.serviceId },
      });
    } else if (body.serviceMode === "horse") {
      await prismaClient.horseRiding.delete({
        where: { id: body.serviceId },
      });
    } else if (body.serviceMode === "hotel") {
      await prismaClient.hotelService.delete({
        where: { id: body.serviceId },
      });
    } else if (body.serviceMode === "restaurant") {
      await prismaClient.restaurantService.delete({
        where: { id: body.serviceId },
      });
    } else if (body.serviceMode === "parasailing") {
      await prismaClient.parasailing.delete({
        where: { id: body.serviceId },
      });
    }

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
