import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SectionHeading from "@/components/marketing/SectionHeading";
import { STAGE_META } from "@/lib/evolution";
import { getAllTrackSlugs, getTrackBySlug, trackTotalXp } from "@/lib/content";

export async function generateStaticParams() {
  const slugs = await getAllTrackSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const track = await getTrackBySlug(slug);
  if (!track) return {};
  return { title: track.title, description: track.tagline };
}

export default async function TrackDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const track = await getTrackBySlug(slug);
  if (!track) notFound();

  return (
    <div className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="outline" className="font-mono text-[10px]">
            {track.category}
          </Badge>
          {track.comingSoon && <Badge className="bg-secondary text-secondary-foreground">Coming soon</Badge>}
          <span className="font-mono text-xs text-muted-foreground">
            {track.level} · {track.durationWeeks} weeks
          </span>
        </div>

        <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {track.title}
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
          {track.tagline}
        </p>
        <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          {track.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          {track.comingSoon ? (
            <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "rounded-full px-6")}>
              Join the waitlist
            </Link>
          ) : (
            <Link href="/sign-up" className={cn(buttonVariants({ size: "lg" }), "rounded-full px-6 glow-violet")}>
              Start this track
            </Link>
          )}
          <Link
            href="/tracks"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-6")}
          >
            All tracks
          </Link>
        </div>

        <section className="mt-16">
          <h2 className="text-lg font-semibold text-foreground">What you&apos;ll be able to do</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {track.outcomes.map((o) => (
              <li key={o} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-commit-green" />
                {o}
              </li>
            ))}
          </ul>
        </section>

        {track.modules.length > 0 && (
          <section className="mt-16">
            <SectionHeading
              eyebrow="Curriculum"
              title="Your commit log for this track"
              align="left"
            />
            <p className="mt-2 font-mono text-xs text-muted-foreground">
              {track.modules.length} modules · {trackTotalXp(track)} XP total
            </p>
            <ol className="mt-8 flex flex-col gap-6 border-l border-border pl-6">
              {track.modules.map((mod, i) => {
                const meta = STAGE_META[mod.stage];
                return (
                  <li key={mod.slug} className="relative">
                    <span
                      className="absolute top-1 -left-[1.85rem] flex h-4 w-4 items-center justify-center rounded-full border-2 border-background"
                      style={{ background: meta.color }}
                    />
                    <div className="flex flex-wrap items-center gap-2">
                      <code className="font-mono text-xs font-medium" style={{ color: meta.color }}>
                        {meta.command}
                      </code>
                      <span className="text-xs text-muted-foreground">
                        module {i + 1} of {track.modules.length}
                      </span>
                    </div>
                    <h3 className="mt-1 font-semibold text-foreground">{mod.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{mod.summary}</p>
                    <ul className="mt-3 flex flex-col gap-1.5">
                      {mod.lessons.map((lesson) => (
                        <li
                          key={lesson.slug}
                          className="flex items-center justify-between gap-4 text-sm text-foreground/80"
                        >
                          <span>{lesson.title}</span>
                          <span className="shrink-0 font-mono text-xs text-muted-foreground">
                            {lesson.minutes}m · {lesson.xp}xp
                          </span>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ol>
          </section>
        )}
      </div>
    </div>
  );
}
