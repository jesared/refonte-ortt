import type { PrismaClient } from "@prisma/client";
import type { Adapter } from "next-auth/adapters";

export function PrismaAdapter(prisma: PrismaClient): Adapter {
  return {
    createUser: (data) =>
      prisma.user.create({ data: data as never }) as never,

    getUser: (id) => prisma.user.findUnique({ where: { id } }) as never,

    getUserByEmail: (email) =>
      prisma.user.findUnique({ where: { email } }) as never,

    getUserByAccount: async ({ provider, providerAccountId }) => {
      const account = await prisma.account.findUnique({
        where: { provider_providerAccountId: { provider, providerAccountId } },
        include: { user: true },
      });

      return account?.user ?? null;
    },

    updateUser: ({ id, ...data }) =>
      prisma.user.update({ where: { id }, data }) as never,

    deleteUser: (id) => prisma.user.delete({ where: { id } }) as never,

    linkAccount: (data) =>
      prisma.account.create({ data: data as never }) as never,

    unlinkAccount: async ({ provider, providerAccountId }) => {
      await prisma.account.delete({
        where: { provider_providerAccountId: { provider, providerAccountId } },
      });
    },

    createSession: (data) =>
      prisma.session.create({ data: data as never }) as never,

    getSessionAndUser: async (sessionToken) => {
      const sessionAndUser = await prisma.session.findUnique({
        where: { sessionToken },
        include: { user: true },
      });

      if (!sessionAndUser) {
        return null;
      }

      return {
        session: sessionAndUser,
        user: sessionAndUser.user,
      };
    },

    updateSession: ({ sessionToken, ...data }) =>
      prisma.session.update({ where: { sessionToken }, data }) as never,

    deleteSession: (sessionToken) =>
      prisma.session.delete({ where: { sessionToken } }) as never,

    createVerificationToken: (data) =>
      prisma.verificationToken.create({ data }) as never,

    useVerificationToken: async ({ identifier, token }) => {
      try {
        return await prisma.verificationToken.delete({
          where: { identifier_token: { identifier, token } },
        });
      } catch {
        return null;
      }
    },
  } satisfies Adapter;
}
