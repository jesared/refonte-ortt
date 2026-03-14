import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { prisma } from "@/lib/prisma";

type AppRole = "ADMIN" | "EDITOR" | "USER";

const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;

const adminEmails = (process.env.ADMIN_EMAILS ?? "admin@ortt.fr")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      const email = user.email?.toLowerCase();

      if (!email) {
        return false;
      }

      const role: AppRole = adminEmails.includes(email) ? ROLES.ADMIN : ROLES.USER;

      await prisma.user.upsert({
        where: { email },
        create: {
          email,
          name: user.name,
          image: user.image,
          role,
        },
        update: {
          name: user.name,
          image: user.image,
          role,
        },
      });

      return true;
    },
    async jwt({ token, user, profile }) {
      const email = (user?.email ?? token.email ?? profile?.email)?.toLowerCase();

      if (!email) {
        return token;
      }

      token.email = email;

      const dbUser = await prisma.user.findUnique({
        where: { email },
        select: { role: true },
      });

      const role: AppRole = (dbUser?.role as AppRole | undefined) ?? ROLES.USER;
      token.role = role;
      token.isAdmin = role === ROLES.ADMIN;

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email ?? session.user.email;

        const role: AppRole =
          (typeof token.role === "string" ? (token.role as AppRole) : undefined) ?? ROLES.USER;

        session.user.role = role;
        session.user.isAdmin = role === ROLES.ADMIN;
      }

      return session;
    },
  },
});
