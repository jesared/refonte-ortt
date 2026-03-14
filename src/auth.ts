import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { prisma } from "@/lib/prisma";

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
    async jwt({ token, user, profile, trigger }) {
      const email = (user?.email ?? token.email ?? profile?.email)?.toLowerCase();

      if (!email) {
        token.isAdmin = false;
        token.role = "USER";
        return token;
      }

      if (trigger === "signIn" || user) {
        await prisma.user.upsert({
          where: { email },
          create: {
            email,
            name: user?.name ?? token.name ?? profile?.name ?? null,
            image: user?.image ?? token.picture ?? (profile as { picture?: string } | undefined)?.picture ?? null,
          },
          update: {
            name: user?.name ?? token.name ?? undefined,
            image:
              user?.image ?? token.picture ?? (profile as { picture?: string } | undefined)?.picture ?? undefined,
          },
        });
      }

      const dbUser = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          role: true,
          name: true,
          image: true,
        },
      });

      token.userId = dbUser?.id;
      token.role = dbUser?.role ?? "USER";
      token.isAdmin = adminEmails.includes(email) || dbUser?.role === "ADMIN";
      token.email = email;
      token.name = dbUser?.name ?? token.name;
      token.picture = dbUser?.image ?? token.picture;

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId;
        session.user.email = token.email ?? session.user.email;
        session.user.name = token.name ?? session.user.name;
        session.user.image = token.picture ?? session.user.image;
        session.user.role = token.role;
        session.user.isAdmin = Boolean(token.isAdmin);
      }
      return session;
    },
  },
});
