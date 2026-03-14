import { PrismaAdapter } from "@auth/prisma-adapter";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const adminEmails = (process.env.ADMIN_EMAILS ?? "admin@ortt.fr")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

const googleClientId =
  process.env.AUTH_GOOGLE_ID ?? process.env.GOOGLE_CLIENT_ID;
const googleClientSecret =
  process.env.AUTH_GOOGLE_SECRET ?? process.env.GOOGLE_CLIENT_SECRET;

export const { handlers, auth, signIn, signOut } = NextAuth({
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

  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  trustHost: true,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google") return false;
      if (!user.email) return false;

      const email = user.email.toLowerCase();
      const existingUser = await prisma.user.findUnique({
        where: { email },
        select: { role: true },
      });

      const role: Role = adminEmails.includes(email)
        ? "ADMIN"
        : existingUser?.role ?? "USER";

      await prisma.user.upsert({
        where: { email },
        update: {
          name: user.name,
          image: user.image,
          role,
          emailVerified: new Date(),
        },
        create: {
          email,
          name: user.name,
          image: user.image,
          role,
          emailVerified: new Date(),
        },
      });

      return true;
    },

    async jwt({ token, user }) {
      if (user?.id) {
        token.sub = user.id;
      }

      if (user?.email) {
        token.email = user.email.toLowerCase();
      }

      let dbUser: { id: string; email: string; role: Role } | null = null;

      if (token.sub) {
        dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { id: true, email: true, role: true },
        });
      }

      if (!dbUser && token.email) {
        dbUser = await prisma.user.findUnique({
          where: { email: token.email.toLowerCase() },
          select: { id: true, email: true, role: true },
        });
      }

      if (dbUser) {
        token.sub = dbUser.id;
        token.email = dbUser.email;
        token.role = dbUser.role;
      } else {
        token.role = (token.role as Role | undefined) ?? "USER";
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.email = token.email ?? session.user.email;
        session.user.role = (token.role as Role | undefined) ?? "USER";
        session.user.isAdmin = session.user.role === "ADMIN";
      }

      return session;
    },
  },
});
