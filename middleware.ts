import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function isAdmin(role: unknown) {
  return typeof role === "string" && role.toLowerCase() === "admin";
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/_next")
  ) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/admin", req.url));
    }

    if (!isAdmin(token.role)) {
      return NextResponse.redirect(new URL("/user", req.url));
    }
  }

  if (pathname.startsWith("/user")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/admin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
