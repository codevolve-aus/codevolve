// Auth is optional for now — the marketing site (and the rest of the app) must not crash when
// Clerk hasn't been provisioned yet. Everything that touches Clerk checks this first.
export function isClerkConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY);
}
