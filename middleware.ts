import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function getRole(token: any): string | null {
  if (!token) return null;

  if (typeof token.role === "string") return token.role;
  if (token.user && typeof token.user.role === "string") return token.user.role;

  return null;
}

function isAdmin(role: string | null) {
  return role?.toLowerCase() === "admin";
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // laisser passer NextAuth et fichiers Next.js
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/_next") ||
    pathname === "/"
  ) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const role = getRole(token);

  // protection admin
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/admin", req.url));
    }

    if (!isAdmin(role)) {
      return NextResponse.redirect(new URL("/user", req.url));
    }
  }

  // protection user
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
