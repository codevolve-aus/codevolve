"use server";

import { revalidatePath } from "next/cache";
import { verifyAdmin } from "@/lib/admin";
import { setAdminRole } from "@/lib/clerk-admin";

export async function toggleAdmin(userId: string, makeAdmin: boolean) {
  const { userId: actingAdminId } = await verifyAdmin();
  if (userId === actingAdminId && !makeAdmin) {
    throw new Error("You can't remove your own admin access.");
  }
  await setAdminRole(userId, makeAdmin);
  revalidatePath(`/admin/students/${userId}`);
  revalidatePath("/admin/students");
}
