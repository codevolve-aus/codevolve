"use server";

import { revalidatePath } from "next/cache";
import { getDb } from "@/src/db";
import { lessonProgress } from "@/src/db/schema";
import { verifySession } from "@/lib/dal";
import { getTrackBySlug, getLessonBySlug } from "@/lib/content";

export async function markLessonComplete(trackSlug: string, lessonSlug: string) {
  const { userId } = await verifySession();
  const track = await getTrackBySlug(trackSlug, { includeDisabled: true });
  if (track && !track.enabled) {
    throw new Error("This track is temporarily unavailable.");
  }
  const found = track ? getLessonBySlug(track, lessonSlug) : undefined;
  if (!track || !found) {
    throw new Error("Lesson not found.");
  }

  const db = getDb();
  await db
    .insert(lessonProgress)
    .values({ userId, trackSlug, lessonSlug, xp: found.lesson.xp })
    .onConflictDoNothing();

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/tracks/${trackSlug}`);
  revalidatePath(`/dashboard/tracks/${trackSlug}/${lessonSlug}`);
}
