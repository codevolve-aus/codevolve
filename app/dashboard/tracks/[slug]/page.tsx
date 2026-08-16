import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { STAGE_META } from "@/lib/evolution";
import { getTrackBySlug, nextIncompleteLesson } from "@/lib/content";
import { getTrackDashboard, isDbConfigured } from "@/lib/dal";
import DbNotConfigured from "@/components/dashboard/DbNotConfigured";
import { isClerkConfigured } from "@/lib/clerk-config";
import { enrollInTrack } from "./actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // Keep this static when Clerk isn't configured — dashboard/layout.tsx bails out to a fully
  // static notice in that case, so this must not be the route's only dynamic data access.
  if (!isClerkConfigured()) return { title: "Track" };
  const { slug } = await params;
  const track = await getTrackBySlug(slug, { includeDisabled: true });
  return { title: track?.title ?? "Track" };
}

export default async function DashboardTrackPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const track = await getTrackBySlug(slug, { includeDisabled: true });
  if (!track) notFound();

  const dbReady = isDbConfigured();
  const data = dbReady ? await getTrackDashboard(slug) : null;
  const completedSlugs = data?.completedSlugs ?? new Set<string>();
  const enrolled = data?.enrolled ?? false;
  const next = nextIncompleteLesson(track, completedSlugs);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <div>
        <p className="font-mono text-xs text-muted-foreground">{track.category}</p>
        <h1 className="mt-1 text-2xl font-semibold text-foreground">{track.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{track.tagline}</p>
      </div>

      {!dbReady && <DbNotConfigured />}

      {dbReady && !track.enabled && (
        <div className="rounded-xl border border-dashed border-border bg-card/40 p-6 text-center">
          <p className="font-mono text-xs text-muted-foreground">temporarily unavailable</p>
          <p className="mt-2 text-sm text-muted-foreground">
            This track has been paused by the CodeVolve team.
            {enrolled && " Your progress is saved and will be here when it reopens."}
          </p>
        </div>
      )}

      {dbReady && track.enabled && !enrolled && (
        <form action={enrollInTrack.bind(null, track.slug)}>
          <Button type="submit" size="lg" className="rounded-full">
            Enroll in this track
          </Button>
        </form>
      )}

      {dbReady && track.enabled && enrolled && next && (
        <Link
          href={`/dashboard/tracks/${track.slug}/${next.lesson.slug}`}
          className="w-fit rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/80"
        >
          Continue: {next.lesson.title} →
        </Link>
      )}

      {dbReady && track.enabled && enrolled && !next && (
        <p className="font-mono text-sm text-commit-green">
          All lessons complete for this track. 🎉
        </p>
      )}

      {track.enabled && (
        <div className="flex flex-col gap-6">
          {track.modules.map((mod, mi) => {
            const meta = STAGE_META[mod.stage];
            return (
              <div key={mod.slug} className="rounded-xl border border-border bg-card/60 p-5">
                <div className="flex items-center gap-2">
                  <code className="font-mono text-xs" style={{ color: meta.color }}>
                    {meta.command}
                  </code>
                  <span className="text-xs text-muted-foreground">
                    module {mi + 1} of {track.modules.length}
                  </span>
                </div>
                <h2 className="mt-1 font-semibold text-foreground">{mod.title}</h2>
                <ul className="mt-3 flex flex-col gap-1">
                  {mod.lessons.map((lesson) => {
                    const done = completedSlugs.has(lesson.slug);
                    return (
                      <li key={lesson.slug}>
                        <Link
                          href={`/dashboard/tracks/${track.slug}/${lesson.slug}`}
                          className="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-secondary/50"
                        >
                          <span className="flex items-center gap-2">
                            <span
                              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[10px] ${
                                done
                                  ? "border-commit-green bg-commit-green/20 text-commit-green"
                                  : "border-border text-muted-foreground"
                              }`}
                            >
                              {done ? "✓" : ""}
                            </span>
                            <span className={done ? "text-muted-foreground line-through" : "text-foreground"}>
                              {lesson.title}
                            </span>
                          </span>
                          <span className="font-mono text-xs text-muted-foreground">
                            {lesson.minutes}m
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
