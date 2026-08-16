// Thin wrapper around Clerk's Backend API for the admin student roster. Only called from
// app/admin/** (already gated by verifyAdmin()) — never expose these broadly.
import "server-only";
import { clerkClient } from "@clerk/nextjs/server";
import type { User } from "@clerk/backend";

export interface StudentSummary {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  imageUrl: string;
  isAdmin: boolean;
  createdAt: number;
}

function primaryEmail(user: User): string | null {
  const primary = user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId);
  return primary?.emailAddress ?? user.emailAddresses[0]?.emailAddress ?? null;
}

function toSummary(user: User): StudentSummary {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: primaryEmail(user),
    imageUrl: user.imageUrl,
    isAdmin: user.publicMetadata?.role === "admin",
    createdAt: user.createdAt,
  };
}

export async function listStudents({
  query,
  limit = 50,
  offset = 0,
}: {
  query?: string;
  limit?: number;
  offset?: number;
} = {}) {
  const client = await clerkClient();
  const { data, totalCount } = await client.users.getUserList({
    query,
    limit,
    offset,
    orderBy: "-created_at",
  });
  return { students: data.map(toSummary), totalCount };
}

export async function getStudentCount() {
  const client = await clerkClient();
  return client.users.getCount();
}

export async function getStudent(userId: string): Promise<StudentSummary | null> {
  const client = await clerkClient();
  try {
    const user = await client.users.getUser(userId);
    return toSummary(user);
  } catch {
    return null;
  }
}

export async function setAdminRole(userId: string, isAdmin: boolean) {
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    publicMetadata: { role: isAdmin ? "admin" : null },
  });
}
