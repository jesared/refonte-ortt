import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function isAdminRole(role: unknown) {
  return typeof role === "string" && role.toLowerCase() === "admin";
}

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const { pathname } = nextUrl;

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = Boolean(token);
  const isAdmin = isAdminRole(token?.role);

  if (pathname.startsWith("/auth/admin") && isAuthenticated) {
    const destination = isAdmin ? "/admin" : "/user";
    return NextResponse.redirect(new URL(destination, nextUrl));
  }

  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      const signInUrl = new URL("/auth/admin", nextUrl);
      signInUrl.searchParams.set("callbackUrl", nextUrl.pathname);
      return NextResponse.redirect(signInUrl);
    }

    if (!isAdmin) {
      return NextResponse.redirect(new URL("/user", nextUrl));
    }
  }

  if (pathname.startsWith("/user")) {
    if (!isAuthenticated) {
      const signInUrl = new URL("/auth/admin", nextUrl);
      signInUrl.searchParams.set("callbackUrl", "/auth/redirect");
      return NextResponse.redirect(signInUrl);
    }

    if (isAdmin) {
      return NextResponse.redirect(new URL("/admin", nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/auth/admin"],
};
