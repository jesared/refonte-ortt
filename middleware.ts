import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const session = req.auth;

  // laisser passer auth
  if (
    nextUrl.pathname.startsWith("/api/auth") ||
    nextUrl.pathname.startsWith("/auth") ||
    nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.next();
  }

  // pas connecté
  if (!session) {
    return NextResponse.redirect(new URL("/auth/admin", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
