import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host") ?? "";
  const pathname = request.nextUrl.pathname;

  if (hostname.startsWith("scout.")) {
    // Let legal pages and static assets pass through unchanged
    if (
      pathname.startsWith("/privacy") ||
      pathname.startsWith("/terms") ||
      pathname.startsWith("/delete-account") ||
      pathname.startsWith("/_next") ||
      pathname.startsWith("/api") ||
      pathname.includes(".")
    ) {
      return NextResponse.next();
    }
    // Rewrite root to Scout landing page
    if (pathname === "/" || pathname === "") {
      return NextResponse.rewrite(new URL("/scout-landing", request.url));
    }
  }

  return NextResponse.next();
}

export const proxyConfig = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
