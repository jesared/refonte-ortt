import { PrismaAdapter } from "@/lib/auth-prisma-adapter";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import NextAuth, { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

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
            allowDangerousEmailAccountLinking: true,
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
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google") return false;
      return Boolean(user.email);
    },

    async jwt({ token, user }) {
      if (user?.id) {
        token.sub = user.id;
      }

      const userId = token.sub;
      if (!userId) {
        token.role = (token.role as Role | undefined) ?? "USER";
        return token;
      }

      const dbUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { role: true },
      });

      token.role = dbUser?.role ?? "USER";
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
