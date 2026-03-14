import { PrismaAdapter } from "@/lib/auth-prisma-adapter";
import { Role } from "@prisma/client";
import NextAuth, { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

const adminEmails = (process.env.ADMIN_EMAILS ?? "admin@ortt.fr")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

const googleClientId =
  process.env.AUTH_GOOGLE_ID ?? process.env.GOOGLE_CLIENT_ID;
const googleClientSecret =
  process.env.AUTH_GOOGLE_SECRET ?? process.env.GOOGLE_CLIENT_SECRET;

const authSecret =
  process.env.AUTH_SECRET ??
  process.env.NEXTAUTH_SECRET ??
  (process.env.NODE_ENV !== "production" ? "dev-only-secret" : undefined);

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),

  providers:
    googleClientId && googleClientSecret
      ? [
          Google({
            clientId: googleClientId,
            clientSecret: googleClientSecret,
          }),
        ]
      : [],

  pages: {
    signIn: "/auth/admin",
    error: "/auth/admin",
  },

  secret: authSecret,
  trustHost: true,

  session: {
    strategy: "database",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google") return false;
      if (!user.email) return false;

      const email = user.email.toLowerCase();
      const existingUser = await prisma.user.findUnique({
        where: { email },
        select: { id: true, role: true },
      });

      const adminRole: Role = adminEmails.includes(email) ? "ADMIN" : "USER";

      if (existingUser) {
        await prisma.user.update({
          where: { id: existingUser.id },
          data: {
            name: user.name,
            image: user.image,
          },
        });
      } else {
        await prisma.user.create({
          data: {
            email,
            name: user.name,
            image: user.image,
            role: adminRole,
          },
        });
      }

      return true;
    },

    async jwt({ token }) {
      if (token.sub) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { role: true },
        });

        token.role = dbUser?.role ?? token.role ?? "USER";
      }

      return token;
    },

    async session({ session, user, token }) {
      if (!session.user) {
        return session;
      }

      session.user.id = user.id;
      session.user.email = user.email ?? session.user.email;
      session.user.role = (user.role as Role | undefined) ?? "USER";
      session.user.isAdmin = session.user.role === "ADMIN";

      if (!session.user.role) {
        session.user.role = (token.role as Role | undefined) ?? "USER";
        session.user.isAdmin = session.user.role === "ADMIN";
      }

      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
