import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") ?? "";
  const pathname = request.nextUrl.pathname;

  // Handle privacy.codevolve.com.au → /privacy
  if (hostname.startsWith("privacy.")) {
    if (pathname === "/" || pathname === "") {
      return NextResponse.rewrite(new URL("/privacy", request.url));
    }
    return NextResponse.next();
  }

  // Handle terms.codevolve.com.au → /terms
  if (hostname.startsWith("terms.")) {
    if (pathname === "/" || pathname === "") {
      return NextResponse.rewrite(new URL("/terms", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
