import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Auth is enforced per-resource via lib/dal.ts's verifySession() (Clerk's current recommended
// pattern) — clerkMiddleware here only attaches the auth context to every request, it does not
// gate /dashboard itself. Path-matcher-based protection (auth.protect() + createRouteMatcher)
// is deprecated upstream because it can diverge from how Next.js actually routes requests.
export const proxy = clerkMiddleware(async (_auth, request) => {
  const hostname = request.headers.get("host") ?? "";
  const pathname = request.nextUrl.pathname;

  if (hostname.startsWith("scout.")) {
    // Let static assets pass through unchanged
    if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
      return NextResponse.next();
    }
    // Scout's legal pages live at app/scout-legal/* now that /privacy, /terms, and
    // /delete-account on the root domain are CodeVolve's own (unrelated) policies —
    // rewritten so Scout's externally-referenced URLs (e.g. app store listings) don't change.
    if (
      pathname === "/privacy" ||
      pathname === "/terms" ||
      pathname === "/delete-account"
    ) {
      return NextResponse.rewrite(new URL(`/scout-legal${pathname}`, request.url));
    }
    // Rewrite root to Scout landing page
    if (pathname === "/" || pathname === "") {
      return NextResponse.rewrite(new URL("/scout-landing", request.url));
    }
  }

  return NextResponse.next();
});

export const proxyConfig = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/(api|trpc)(.*)",
  ],
};
