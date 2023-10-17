import { ProfileType } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import prismaClient from "@/lib/prisma-client";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password, profileType } = credentials as {
          email: string;
          password: string;
          profileType: ProfileType;
        };

        const user =
          profileType === ProfileType.Business
            ? await prismaClient.user.findUnique({
                where: {
                  email,
                },
                include: {
                  business: true,
                },
              })
            : await prismaClient.user.findUnique({
                where: {
                  email,
                },
                include: {
                  traveller: true,
                },
              });

        if (!user) {
          return null;
        }

        const passwordMatch = await bcrypt.compareSync(password, user.password);

        if (!passwordMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.profileType = user.profileType;
        token.businessOnboarded = user.businessOnboarded;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.profileType = token.profileType;
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
  // callbacks: {
  //   async jwt({ user, token, account, profile }) {
  //     // Persist the OAuth access_token and or the user id to the token right after signin
  //     if (account) {
  //       token.accessToken = account.access_token;
  //       token.id = user?.id;
  //     }
  //     return token;
  //   },
  //   async session({ session, token, user }) {
  //   // Send properties to the client, like an access_token and user id from a provider.
  //   session.accessToken = token.accessToken
  //   session.user.id = token.id

  //   return session
  // }
  // },
};
