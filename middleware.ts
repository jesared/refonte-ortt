import { NextResponse } from "next/server";

import { auth } from "@/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const role = req.auth?.user?.role;

  if (!req.auth?.user) {
    return NextResponse.redirect(new URL("/auth/admin", req.url));
  }

  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/user", req.url));
  }

  if (pathname.startsWith("/user") && role === "ADMIN") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
});

export const config = { matcher: ["/admin", "/admin/:path*", "/user", "/user/:path*"] };
