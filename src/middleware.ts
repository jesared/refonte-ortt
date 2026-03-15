import { NextResponse } from "next/server";

import { auth } from "@/auth";

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const { pathname } = nextUrl;
  const isAuthenticated = Boolean(session?.user);
  const role = session?.user?.role;

  if (pathname.startsWith("/auth/admin") && isAuthenticated) {
    const destination = role?.toLowerCase() === "admin" ? "/admin" : "/user";
    return NextResponse.redirect(new URL(destination, nextUrl));
  }

  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      const signInUrl = new URL("/auth/admin", nextUrl);
      signInUrl.searchParams.set("callbackUrl", nextUrl.pathname);
      return NextResponse.redirect(signInUrl);
    }

    if (role?.toLowerCase() !== "admin") {
      return NextResponse.redirect(new URL("/user", nextUrl));
    }
  }

  if (pathname.startsWith("/user")) {
    if (!isAuthenticated) {
      const signInUrl = new URL("/auth/admin", nextUrl);
      signInUrl.searchParams.set("callbackUrl", "/auth/redirect");
      return NextResponse.redirect(signInUrl);
    }

    if (role?.toLowerCase() === "admin") {
      return NextResponse.redirect(new URL("/admin", nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/auth/admin"],
};
