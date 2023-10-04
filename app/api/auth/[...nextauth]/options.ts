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
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await prismaClient.user.findFirst({
          where: {
            email: email,
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
    async jwt({ token, user, session }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          profileType: user,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.idToken,
            name: token.name,
            email: token.email,
          },
        };
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
