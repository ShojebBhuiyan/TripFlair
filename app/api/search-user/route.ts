import prismaClient from "@/lib/prisma-client";

type SearchUserRequestBody = {
  email: string;
};

export async function POST(req: Request) {
  const body: SearchUserRequestBody = await req.json();

  try {
    const user = await prismaClient.user.findFirst({
      where: { email: body.email },
    });

    if (user) {
      return new Response("User Found!", { status: 200, statusText: "OK" });
    } else {
      return new Response("User Not Found!", {
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
