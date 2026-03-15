import { PrismaAdapter } from "@auth/prisma-adapter";
import { Role } from "@prisma/client";
import NextAuth, { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

import { prisma } from "@/lib/prisma";

const adminEmails = (process.env.ADMIN_EMAILS ?? "admin@ortt.fr")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

const authSecret =
  process.env.NEXTAUTH_SECRET ??
  process.env.AUTH_SECRET ??
  "fallback-auth-secret-change-me";

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  secret: authSecret,
  trustHost: true,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user }) {
      return !!user.email;
    },

    async jwt({ token, user }) {
      // première connexion
      if (user) {
        token.sub = user.id;
      }

      if (token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: {
            id: true,
            role: true,
          },
        });

        if (dbUser) {
          token.sub = dbUser.id;
          token.role = dbUser.role;
        } else {
          token.role = "USER";
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (!session.user) return session;

      session.user.id = token.sub ?? "";
      session.user.role = (token.role as Role) ?? "USER";
      session.user.isAdmin = session.user.role === "ADMIN";

      return session;
    },
  },

  events: {
    async createUser({ user }) {
      if (!user.email) return;

      const role: Role = adminEmails.includes(user.email.toLowerCase())
        ? "ADMIN"
        : "USER";

      await prisma.user.update({
        where: { id: user.id },
        data: { role },
      });
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
