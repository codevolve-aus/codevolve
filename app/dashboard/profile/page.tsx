import type { Metadata } from "next";
import EvolutionBadge from "@/components/dashboard/EvolutionBadge";
import CommitTimeline from "@/components/dashboard/CommitTimeline";
import DbNotConfigured from "@/components/dashboard/DbNotConfigured";
import { getCurrentUserDTO, getMyActivity, getMyEnrollments, isDbConfigured } from "@/lib/dal";
import { evolutionFromXp } from "@/lib/xp";

export const metadata: Metadata = { title: "Profile" };

export default async function ProfilePage() {
  const user = await getCurrentUserDTO();
  const dbReady = isDbConfigured();

  const activity = dbReady ? await getMyActivity() : [];
  const enrollments = dbReady ? await getMyEnrollments() : [];
  const totalXp = activity.reduce((sum, a) => sum + a.xp, 0);
  const evolution = evolutionFromXp(totalXp);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <div className="flex items-center gap-4">
        {user?.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.imageUrl}
            alt=""
            className="h-14 w-14 rounded-full border border-border"
          />
        )}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            {user?.firstName ?? "Your"} profile
          </h1>
          <p className="text-sm text-muted-foreground">
            Enrolled in {enrollments.length} track{enrollments.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      {!dbReady && <DbNotConfigured />}

      <EvolutionBadge evolution={evolution} />

      <section>
        <h2 className="text-lg font-semibold text-foreground">Commit log</h2>
        <p className="text-sm text-muted-foreground">
          Every lesson you complete is a commit in your evolution history.
        </p>
        <div className="mt-4 rounded-xl border border-border bg-card/60 p-6">
          <CommitTimeline
            rows={activity.map((a) => ({
              trackSlug: a.trackSlug,
              lessonSlug: a.lessonSlug,
              xp: a.xp,
              completedAt: new Date(a.completedAt),
            }))}
          />
        </div>
      </section>
    </div>
  );
}
