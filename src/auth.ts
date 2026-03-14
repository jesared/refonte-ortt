import { prisma } from "@/lib/prisma";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const adminEmails = (process.env.ADMIN_EMAILS ?? "admin@ortt.fr")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user }) {
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
