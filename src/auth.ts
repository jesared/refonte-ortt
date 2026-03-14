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
  providers:
    googleClientId && googleClientSecret
      ? [
          Google({
            clientId: googleClientId,
            clientSecret: googleClientSecret,
          }),
        ]
      : [],

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
      const isAdmin = adminEmails.includes(email);

      await prisma.user.upsert({
        where: { email },
        update: {
          name: user.name,
          image: user.image,
          role: isAdmin ? "ADMIN" : "USER",
        },
        create: {
          email,
          name: user.name,
          image: user.image,
          role: isAdmin ? "ADMIN" : "USER",
        },
      });

      return true;
    },

    async jwt({ token, user }) {
      // Première connexion
      if (user?.email) {
        token.email = user.email.toLowerCase();
      }

      if (token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
        });

        token.isAdmin = dbUser?.role === "ADMIN";
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string;

        (session.user as { isAdmin?: boolean }).isAdmin = Boolean(
          token.isAdmin,
        );
      }

      return session;
    },
  },
});
