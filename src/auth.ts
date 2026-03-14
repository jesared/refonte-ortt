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
  process.env.AUTH_SECRET ??
  process.env.NEXTAUTH_SECRET ??
  (process.env.NODE_ENV !== "production" ? "dev-only-secret" : undefined);

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  pages: {
    signIn: "/auth/admin",
    error: "/auth/admin",
  },

  secret: authSecret,
  trustHost: true,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google") return false;
      return Boolean(user.email);
    },

    async jwt({ token }) {
      if (!token.email) {
        token.role = (token.role as Role | undefined) ?? "USER";
        return token;
      }

      const user = await prisma.user.findUnique({
        where: { email: token.email },
        select: { id: true, role: true },
      });

      if (user?.id) {
        token.sub = user.id;
      }

      token.role = user?.role ?? "USER";
      return token;
    },

    async session({ session, token }) {
      if (!session.user) {
        return session;
      }

      session.user.id = token.sub ?? session.user.id;
      session.user.role = (token.role as Role | undefined) ?? "USER";
      session.user.isAdmin = session.user.role === "ADMIN";

      if (!session.user.email && token.email) {
        session.user.email = token.email;
      }

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
