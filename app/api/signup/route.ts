import { PresentLocation, ProfileType } from "@prisma/client";
import bcrypt from "bcrypt";
import { v4 } from "uuid";

import prismaClient from "@/lib/prisma-client";

const saltRounds = 10;

type SignUpRequestBody = {
  name: string;
  email: string;
  password: string;
  profileType: ProfileType;
};

export async function POST(req: Request) {
  const body: SignUpRequestBody = await req.json();
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(body.password, salt);

  try {
    const user = await prismaClient.user.create({
      data: {
        id: v4(),
        name: body.name,
        email: body.email,
        password: hashedPassword,
        profileType: body.profileType,
        traveller: {
          create: {
            id: v4(),
          },
        },
      },
    });
    return new Response("Signup Confirmed!", { status: 200, statusText: "OK" });
  } catch (error) {
    console.log(error);
    return new Response("Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
