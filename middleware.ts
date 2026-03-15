import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/_next")
  ) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token && (pathname.startsWith("/admin") || pathname.startsWith("/user"))) {
    return NextResponse.redirect(new URL("/auth/admin", req.url));
  }

  if (token && pathname.startsWith("/admin") && token.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/user", req.url));
  }

  if (token && pathname.startsWith("/user") && token.role === "ADMIN") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*", "/user/:path*"] };
