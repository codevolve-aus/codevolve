import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { LessonMarkdown } from "@/lib/markdown";
import { getTrackBySlug, getAllLessons, getLessonBySlug } from "@/lib/content";
import { getTrackDashboard, isDbConfigured } from "@/lib/dal";
import DbNotConfigured from "@/components/dashboard/DbNotConfigured";
import { isClerkConfigured } from "@/lib/clerk-config";
import { markLessonComplete } from "./actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lessonSlug: string }>;
}): Promise<Metadata> {
  // Keep this static when Clerk isn't configured — dashboard/layout.tsx bails out to a fully
  // static notice in that case, so this must not be the route's only dynamic data access.
  if (!isClerkConfigured()) return { title: "Lesson" };
  const { slug, lessonSlug } = await params;
  const track = await getTrackBySlug(slug, { includeDisabled: true });
  const found = track ? getLessonBySlug(track, lessonSlug) : undefined;
  return { title: found?.lesson.title ?? "Lesson" };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lessonSlug: string }>;
}) {
  const { slug, lessonSlug } = await params;
  const track = await getTrackBySlug(slug, { includeDisabled: true });
  if (!track) notFound();
  // Frozen for everyone while disabled — bounce to the track page, which shows a clear notice
  // instead of silently 404ing on someone who was already partway through a lesson.
  if (!track.enabled) redirect(`/dashboard/tracks/${slug}`);
  const found = getLessonBySlug(track, lessonSlug);
  if (!found) notFound();
  const { module: mod, lesson } = found;

  const dbReady = isDbConfigured();
  if (!dbReady) {
    return (
      <div className="mx-auto max-w-2xl">
        <DbNotConfigured />
      </div>
    );
  }

  const data = await getTrackDashboard(slug);
  if (!data?.enrolled) redirect(`/dashboard/tracks/${slug}`);
  const done = data.completedSlugs.has(lesson.slug);

  const allLessons = getAllLessons(track);
  const idx = allLessons.findIndex((l) => l.slug === lesson.slug);
  const prev = idx > 0 ? allLessons[idx - 1] : undefined;
  const next = idx < allLessons.length - 1 ? allLessons[idx + 1] : undefined;

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <Link
          href={`/dashboard/tracks/${track.slug}`}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← {track.title}
        </Link>
        <p className="mt-3 font-mono text-xs text-muted-foreground">
          {mod.title} · {lesson.minutes} min · {lesson.xp} xp
        </p>
        <h1 className="mt-1 text-2xl font-semibold text-foreground">{lesson.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{lesson.summary}</p>
      </div>

      <div className="rounded-xl border border-border bg-card/60 p-6">
        <LessonMarkdown content={lesson.content} />
      </div>

      <div className="flex items-center justify-between gap-4">
        <div>
          {prev && (
            <Link
              href={`/dashboard/tracks/${track.slug}/${prev.slug}`}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              ← {prev.title}
            </Link>
          )}
        </div>

        {done ? (
          next ? (
            <Link
              href={`/dashboard/tracks/${track.slug}/${next.slug}`}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/80"
            >
              Next: {next.title} →
            </Link>
          ) : (
            <span className="font-mono text-sm text-commit-green">Track complete 🎉</span>
          )
        ) : (
          <form action={markLessonComplete.bind(null, track.slug, lesson.slug)}>
            <Button type="submit" size="lg" className="rounded-full">
              Mark complete (+{lesson.xp}xp)
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
