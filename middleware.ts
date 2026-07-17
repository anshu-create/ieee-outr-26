import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", path);

  // Protect /admin routes, except /admin/login
  if (path.startsWith("/admin") && path !== "/admin/login") {
    const sessionCookie = request.cookies.get("ieee_admin_session")?.value;

    if (sessionCookie !== "authenticated_session_token_2026") {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If visiting /admin/login but already authenticated, redirect to /admin overview
  if (path === "/admin/login") {
    const sessionCookie = request.cookies.get("ieee_admin_session")?.value;
    if (sessionCookie === "authenticated_session_token_2026") {
      const adminUrl = new URL("/admin", request.url);
      return NextResponse.redirect(adminUrl);
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
