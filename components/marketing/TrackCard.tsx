import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Track } from "@/lib/content";
import { trackLessonCount } from "@/lib/content";

export default function TrackCard({ track }: { track: Track }) {
  return (
    <Link
      href={`/tracks/${track.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${track.gradient}`}
      />
      <div className="mb-4 flex items-start justify-between gap-3">
        <Badge variant="outline" className="font-mono text-[10px] text-muted-foreground">
          {track.category}
        </Badge>
        {track.comingSoon && (
          <Badge className="bg-secondary text-secondary-foreground">Coming soon</Badge>
        )}
      </div>
      <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
        {track.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{track.tagline}</p>
      <div className="mt-6 flex items-center gap-4 border-t border-border pt-4 font-mono text-xs text-muted-foreground">
        <span>{track.level}</span>
        <span aria-hidden>·</span>
        <span>{track.durationWeeks} wks</span>
        {!track.comingSoon && (
          <>
            <span aria-hidden>·</span>
            <span>{trackLessonCount(track)} lessons</span>
          </>
        )}
      </div>
    </Link>
  );
}
