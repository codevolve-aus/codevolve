import { cache } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { forbidden } from "next/navigation";
import { verifySession } from "@/lib/dal";

/** Set on a Clerk user via `publicMetadata: { role: "admin" }` — see README. */
export function isAdminUser(user: { publicMetadata?: Record<string, unknown> } | null) {
  return user?.publicMetadata?.role === "admin";
}

// Cached per-request — safe to call from every /admin page/layout without extra API calls.
export const verifyAdmin = cache(async () => {
  const session = await verifySession();
  const user = await currentUser();
  if (!isAdminUser(user)) forbidden();
  return session;
});
