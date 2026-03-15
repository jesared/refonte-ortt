import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function isAdminRole(role: unknown) {
  return typeof role === "string" && role.toLowerCase() === "admin";
}

function buildSignInUrl(nextUrl: NextRequest["nextUrl"]) {
  const signInUrl = new URL("/api/auth/signin", nextUrl);
  signInUrl.searchParams.set(
    "callbackUrl",
    `${nextUrl.pathname}${nextUrl.search}`,
  );
  return signInUrl;
}

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const { pathname } = nextUrl;

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = Boolean(token);
  const isAdmin = isAdminRole(token?.role);

  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(buildSignInUrl(nextUrl));
    }

    if (!isAdmin) {
      return NextResponse.redirect(new URL("/user", nextUrl));
    }
  }

  if (pathname.startsWith("/user")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(buildSignInUrl(nextUrl));
    }

    if (isAdmin) {
      return NextResponse.redirect(new URL("/admin", nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
