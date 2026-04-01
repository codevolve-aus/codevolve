import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host") ?? "";
  const pathname = request.nextUrl.pathname;

  // Redirect scout.codevolve.com.au root → /privacy as the default landing
  if (hostname.startsWith("scout.")) {
    if (pathname === "/" || pathname === "") {
      return NextResponse.redirect(new URL("/privacy", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
