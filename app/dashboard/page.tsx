import Link from "next/link";
import type { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import EvolutionBadge from "@/components/dashboard/EvolutionBadge";
import CommitTimeline from "@/components/dashboard/CommitTimeline";
import DbNotConfigured from "@/components/dashboard/DbNotConfigured";
import TrackCard from "@/components/marketing/TrackCard";
import { getCurrentUserDTO, getDashboardSummary, isDbConfigured } from "@/lib/dal";
import { evolutionFromXp } from "@/lib/xp";
import { getAllTracks } from "@/lib/content";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const user = await getCurrentUserDTO();
  const dbReady = isDbConfigured();
  const [summary, allTracks] = await Promise.all([
    dbReady ? getDashboardSummary() : null,
    dbReady ? getAllTracks() : Promise.resolve([]),
  ]);
  const evolution = summary?.evolution ?? evolutionFromXp(0);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Welcome back{user?.firstName ? `, ${user.firstName}` : ""}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here&apos;s where your evolution stands.
        </p>
      </div>

      {!dbReady && <DbNotConfigured />}

      <EvolutionBadge evolution={evolution} />

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Your tracks</h2>
          <Link href="/tracks" className="text-sm text-primary hover:underline">
            Browse all tracks →
          </Link>
        </div>

        {summary && summary.enrolledTracks.length > 0 ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {summary.enrolledTracks.map(({ track, percent, completedLessons, totalLessons }) => (
              <Link
                key={track.slug}
                href={`/dashboard/tracks/${track.slug}`}
                className="rounded-xl border border-border bg-card/60 p-5 transition-colors hover:border-primary/40"
              >
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">{track.title}</h3>
                  {!track.enabled && (
                    <span className="rounded-full bg-destructive/15 px-2 py-0.5 font-mono text-[10px] text-destructive">
                      Paused
                    </span>
                  )}
                </div>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {completedLessons}/{totalLessons} lessons · {percent}%
                </p>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-primary" style={{ width: `${percent}%` }} />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-dashed border-border p-6 text-center">
            <p className="text-sm text-muted-foreground">
              You&apos;re not enrolled in a track yet.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {allTracks.filter((t) => !t.comingSoon).map((track) => (
                <TrackCard key={track.slug} track={track} />
              ))}
            </div>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground">Recent activity</h2>
        <div className="mt-4 rounded-xl border border-border bg-card/60 p-6">
          <CommitTimeline
            rows={(summary?.progress ?? [])
              .slice()
              .sort((a, b) => +new Date(b.completedAt) - +new Date(a.completedAt))
              .slice(0, 6)
              .map((p) => ({
                trackSlug: p.trackSlug,
                lessonSlug: p.lessonSlug,
                xp: p.xp,
                completedAt: new Date(p.completedAt),
              }))}
          />
        </div>
      </section>

      <Link
        href="/dashboard/profile"
        className={cn(buttonVariants({ variant: "outline" }), "w-fit rounded-full")}
      >
        View full profile
      </Link>
    </div>
  );
}
