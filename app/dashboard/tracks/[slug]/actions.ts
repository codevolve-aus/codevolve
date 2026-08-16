"use server";

import { revalidatePath } from "next/cache";
import { getDb } from "@/src/db";
import { enrollments } from "@/src/db/schema";
import { verifySession } from "@/lib/dal";
import { getTrackBySlug } from "@/lib/content";

export async function enrollInTrack(trackSlug: string) {
  const { userId } = await verifySession();
  const track = await getTrackBySlug(trackSlug);
  if (!track || track.comingSoon) {
    throw new Error("This track is not open for enrollment.");
  }

  const db = getDb();
  await db.insert(enrollments).values({ userId, trackSlug }).onConflictDoNothing();

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/tracks/${trackSlug}`);
}
