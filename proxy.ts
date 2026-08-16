import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";
import { isClerkConfigured } from "@/lib/clerk-config";

// Host-based rewrites for the separate Scout product — runs regardless of whether Clerk is
// configured, since the marketing site must work even with zero auth setup.
function scoutRewrite(request: NextRequest): NextResponse | undefined {
  const hostname = request.headers.get("host") ?? "";
  const pathname = request.nextUrl.pathname;

  if (!hostname.startsWith("scout.")) return undefined;

  // Let static assets pass through unchanged
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next();
  }
  // Scout's legal pages live at app/scout-legal/* now that /privacy, /terms, and
  // /delete-account on the root domain are CodeVolve's own (unrelated) policies —
  // rewritten so Scout's externally-referenced URLs (e.g. app store listings) don't change.
  if (pathname === "/privacy" || pathname === "/terms" || pathname === "/delete-account") {
    return NextResponse.rewrite(new URL(`/scout-legal${pathname}`, request.url));
  }
  // Rewrite root to Scout landing page
  if (pathname === "/" || pathname === "") {
    return NextResponse.rewrite(new URL("/scout-landing", request.url));
  }
  return undefined;
}

function baseProxy(request: NextRequest) {
  return scoutRewrite(request) ?? NextResponse.next();
}

// Auth is enforced per-resource via lib/dal.ts's verifySession() (Clerk's current recommended
// pattern) — clerkMiddleware here only attaches the auth context to every request, it does not
// gate /dashboard itself. Path-matcher-based protection (auth.protect() + createRouteMatcher)
// is deprecated upstream because it can diverge from how Next.js actually routes requests.
//
// Until Clerk is provisioned (no student accounts needed yet), skip wrapping in
// clerkMiddleware() entirely so the rest of the site keeps working with zero auth setup.
const clerkWrapped = isClerkConfigured()
  ? clerkMiddleware(async (_auth, request) => baseProxy(request))
  : null;

export function proxy(request: NextRequest, event: unknown) {
  if (clerkWrapped) return clerkWrapped(request, event as Parameters<typeof clerkWrapped>[1]);
  return baseProxy(request);
}

export const proxyConfig = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/(api|trpc)(.*)",
  ],
};
