import { getTrackBySlug } from "@/lib/content";

export interface ActivityRow {
  trackSlug: string;
  lessonSlug: string;
  xp: number;
  completedAt: Date;
}

export default async function CommitTimeline({ rows }: { rows: ActivityRow[] }) {
  if (rows.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No commits yet — complete a lesson to start your log.
      </p>
    );
  }

  const uniqueTrackSlugs = [...new Set(rows.map((r) => r.trackSlug))];
  // includeDisabled — this is a historical log; a lesson completed before a track was disabled
  // should still show its real title, not fall back to the raw slug.
  const tracks = await Promise.all(
    uniqueTrackSlugs.map((slug) => getTrackBySlug(slug, { includeDisabled: true })),
  );
  const tracksBySlug = new Map(tracks.filter(Boolean).map((t) => [t!.slug, t!]));

  return (
    <ol className="flex flex-col gap-4 border-l border-border pl-5">
      {rows.map((row, i) => {
        const track = tracksBySlug.get(row.trackSlug);
        const lesson = track?.modules
          .flatMap((m) => m.lessons)
          .find((l) => l.slug === row.lessonSlug);
        return (
          <li key={`${row.trackSlug}-${row.lessonSlug}-${i}`} className="relative">
            <span className="absolute top-1.5 -left-[1.4rem] h-2.5 w-2.5 rounded-full bg-primary" />
            <div className="flex flex-wrap items-baseline gap-2">
              <code className="font-mono text-xs text-commit-green">completed</code>
              <span className="text-sm text-foreground">{lesson?.title ?? row.lessonSlug}</span>
              <span className="font-mono text-xs text-muted-foreground">+{row.xp}xp</span>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {track?.title ?? row.trackSlug} ·{" "}
              {row.completedAt.toLocaleDateString("en-AU", { day: "numeric", month: "short" })}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
