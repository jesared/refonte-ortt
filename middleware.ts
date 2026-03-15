import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const authSecret =
  process.env.NEXTAUTH_SECRET ??
  (process.env.NODE_ENV !== "production" ? "dev-only-secret" : undefined);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getToken({ req, secret: authSecret });
  const role = token?.role;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/admin", req.url));
  }

  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/user", req.url));
  }

  if (pathname.startsWith("/user") && role === "ADMIN") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/admin", "/admin/:path*", "/user", "/user/:path*"] };
