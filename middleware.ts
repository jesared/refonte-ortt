import { NextResponse } from "next/server";

import { auth } from "@/auth";

const adminEmails = (process.env.ADMIN_EMAILS ?? "admin@ortt.fr")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

const ADMIN_LOGIN_PATH = "/auth/admin";

export default auth((request) => {
  const email = request.auth?.user?.email?.toLowerCase();

  if (!email) {
    const loginUrl = new URL(ADMIN_LOGIN_PATH, request.nextUrl.origin);
    loginUrl.searchParams.set("error", "auth_required");
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (!adminEmails.includes(email)) {
    const loginUrl = new URL(ADMIN_LOGIN_PATH, request.nextUrl.origin);
    loginUrl.searchParams.set("error", "forbidden");
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
