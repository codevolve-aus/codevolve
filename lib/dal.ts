// Data Access Layer — the one seam where auth checks and student data reads happen.
// Server Components, Server Actions, and Route Handlers should all go through this file
// rather than querying the DB or trusting proxy.ts's optimistic auth check directly.

import { cache } from "react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { getDb } from "@/src/db";
import { enrollments, lessonProgress } from "@/src/db/schema";
import { getTrackBySlug, getAllLessons, isDbConfigured } from "@/lib/content";
import { evolutionFromXp } from "@/lib/xp";

export { isDbConfigured };

// Cached per-request so multiple Server Components can call this cheaply.
export const verifySession = cache(async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  return { userId };
});

export interface CurrentUserDTO {
  id: string;
  firstName: string | null;
  imageUrl: string;
}

export async function getCurrentUserDTO(): Promise<CurrentUserDTO | null> {
  const user = await currentUser();
  if (!user) return null;
  return { id: user.id, firstName: user.firstName, imageUrl: user.imageUrl };
}

export async function getMyEnrollments() {
  const { userId } = await verifySession();
  const db = getDb();
  return db.select().from(enrollments).where(eq(enrollments.userId, userId));
}

export async function getMyProgress() {
  const { userId } = await verifySession();
  const db = getDb();
  return db.select().from(lessonProgress).where(eq(lessonProgress.userId, userId));
}

export async function isEnrolled(trackSlug: string) {
  const rows = await getMyEnrollments();
  return rows.some((r) => r.trackSlug === trackSlug);
}

export async function isLessonComplete(trackSlug: string, lessonSlug: string) {
  const rows = await getMyProgress();
  return rows.some((r) => r.trackSlug === trackSlug && r.lessonSlug === lessonSlug);
}

/** Everything the /dashboard home needs, in one call. */
export async function getDashboardSummary() {
  const [myEnrollments, myProgress] = await Promise.all([getMyEnrollments(), getMyProgress()]);

  const totalXp = myProgress.reduce((sum, p) => sum + p.xp, 0);
  const evolution = evolutionFromXp(totalXp);

  const enrolledTracks = (
    await Promise.all(
      myEnrollments.map(async (e) => {
        // includeDisabled: a disabled track should still show up here (frozen, badged) rather
        // than silently vanish from a student who was already enrolled in it.
        const track = await getTrackBySlug(e.trackSlug, { includeDisabled: true });
        if (!track) return null;
        const lessons = getAllLessons(track);
        const completed = myProgress.filter((p) => p.trackSlug === track.slug).length;
        return {
          track,
          enrolledAt: e.enrolledAt,
          completedLessons: completed,
          totalLessons: lessons.length,
          percent: lessons.length ? Math.round((completed / lessons.length) * 100) : 0,
        };
      }),
    )
  ).filter((v): v is NonNullable<typeof v> => v !== null);

  return { evolution, enrolledTracks, totalXp, progress: myProgress };
}

export async function getTrackDashboard(trackSlug: string) {
  // includeDisabled so the track page can show a clear "temporarily unavailable" notice to an
  // already-enrolled student instead of a bare 404.
  const track = await getTrackBySlug(trackSlug, { includeDisabled: true });
  if (!track) return null;

  const [enrolled, myProgress] = await Promise.all([isEnrolled(trackSlug), getMyProgress()]);
  const completedSlugs = new Set(
    myProgress.filter((p) => p.trackSlug === trackSlug).map((p) => p.lessonSlug),
  );

  return { track, enrolled, completedSlugs };
}

/** Used by /dashboard/profile — a commit-log style activity feed. */
export async function getMyActivity() {
  const rows = await getMyProgress();
  return [...rows].sort((a, b) => +new Date(b.completedAt) - +new Date(a.completedAt));
}

