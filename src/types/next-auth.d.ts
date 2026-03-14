import { DefaultSession } from "next-auth";

type AppRole = "ADMIN" | "EDITOR" | "USER";

declare module "next-auth" {
  interface Session {
    user?: DefaultSession["user"] & {
      isAdmin?: boolean;
      role?: AppRole;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isAdmin?: boolean;
    role?: AppRole;
  }
}
