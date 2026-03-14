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
    strategy: "database",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google") return false;
      if (!user.email) return false;

      const email = user.email.toLowerCase();
      const isAdmin = adminEmails.includes(email);
      const role: Role = isAdmin ? "ADMIN" : "USER";

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

      if (!token.sub && token.email) {
        const dbUserByEmail = await prisma.user.findUnique({
          where: { email: token.email.toLowerCase() },
          select: { id: true },
        });

        token.sub = dbUserByEmail?.id;
      }

      if (token.sub) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { role: true },
        });

        token.role = dbUser?.role ?? "USER";
      }

      return token;
    },

    async session({ session, token, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.email = user.email ?? session.user.email;
        session.user.name = user.name;
        session.user.image = user.image;
        session.user.role = user.role;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
  },
});
