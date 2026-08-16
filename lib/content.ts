// Async, database-backed reads for editable content (tracks/modules/lessons, mentors,
// testimonials) — the /admin counterpart to this is app/admin/**/actions.ts. Cached with
// tags so admin writes can invalidate exactly what changed via updateTag()/revalidateTag().
import { cacheLife, cacheTag } from "next/cache";
import { eq, and } from "drizzle-orm";
import { getDb } from "@/src/db";
import { tracks } from "@/src/db/schema";
import { SEED_TRACKS } from "@/src/db/seed-data";
import type { EvolutionStage } from "@/lib/evolution";

export function isDbConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  summary: string;
  minutes: number;
  xp: number;
  content: string;
}

export interface Module {
  id: string;
  slug: string;
  title: string;
  summary: string;
  stage: EvolutionStage;
  lessons: Lesson[];
}

export interface Track {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  level: string;
  durationWeeks: number;
  gradient: string;
  icon: string;
  comingSoon: boolean;
  enabled: boolean;
  outcomes: string[];
  modules: Module[];
}

export interface Mentor {
  id: string;
  slug: string;
  name: string;
  role: string;
  companyType: string;
  bio: string;
  focus: string[];
  initials: string;
}

export interface Testimonial {
  id: string;
  name: string;
  context: string;
  quote: string;
  outcome: string;
  track: string;
}

type TrackRow = Awaited<ReturnType<typeof fetchTrackRows>>[number];

async function fetchTrackRows(includeDisabled: boolean) {
  const db = getDb();
  return db.query.tracks.findMany({
    where: includeDisabled ? undefined : eq(tracks.enabled, true),
    orderBy: (t, { asc }) => [asc(t.order)],
    with: {
      modules: {
        orderBy: (m, { asc }) => [asc(m.order)],
        with: {
          lessons: { orderBy: (l, { asc }) => [asc(l.order)] },
        },
      },
    },
  });
}

function mapTrackRow(row: TrackRow): Track {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    tagline: row.tagline,
    description: row.description,
    category: row.category,
    level: row.level,
    durationWeeks: row.durationWeeks,
    gradient: row.gradient,
    icon: row.icon,
    comingSoon: row.comingSoon,
    enabled: row.enabled,
    outcomes: row.outcomes,
    modules: row.modules.map((m) => ({
      id: m.id,
      slug: m.slug,
      title: m.title,
      summary: m.summary,
      stage: m.stage as EvolutionStage,
      lessons: m.lessons.map((l) => ({
        id: l.id,
        slug: l.slug,
        title: l.title,
        summary: l.summary,
        minutes: l.minutes,
        xp: l.xp,
        content: l.content,
      })),
    })),
  };
}

/**
 * @param includeDisabled Pass `true` only for admin views or for resolving a track an
 * already-enrolled student needs to see the "temporarily unavailable" state for — public
 * pages must never pass this, since a disabled track is meant to be fully hidden/frozen.
 */
export async function getAllTracks({ includeDisabled = false } = {}): Promise<Track[]> {
  "use cache";
  cacheTag("tracks");
  cacheLife("hours");
  if (!isDbConfigured()) return [];
  const rows = await fetchTrackRows(includeDisabled);
  return rows.map(mapTrackRow);
}

export async function getTrackBySlug(
  slug: string,
  { includeDisabled = false } = {},
): Promise<Track | undefined> {
  "use cache";
  cacheTag("tracks", `track-${slug}`);
  cacheLife("hours");
  if (!isDbConfigured()) return undefined;
  const db = getDb();
  const row = await db.query.tracks.findFirst({
    where: includeDisabled ? eq(tracks.slug, slug) : and(eq(tracks.slug, slug), eq(tracks.enabled, true)),
    with: {
      modules: {
        orderBy: (m, { asc }) => [asc(m.order)],
        with: {
          lessons: { orderBy: (l, { asc }) => [asc(l.order)] },
        },
      },
    },
  });
  return row ? mapTrackRow(row) : undefined;
}

export async function getAllTrackSlugs(): Promise<string[]> {
  "use cache";
  cacheTag("tracks");
  cacheLife("hours");
  // Cache Components requires generateStaticParams to return at least one result — fall back
  // to the seed slugs so a build never hard-fails just because DATABASE_URL isn't set yet.
  if (!isDbConfigured()) return SEED_TRACKS.map((t) => t.slug);
  const db = getDb();
  const rows = await db.select({ slug: tracks.slug }).from(tracks).where(eq(tracks.enabled, true));
  return rows.map((r) => r.slug);
}

export async function getMentors(): Promise<Mentor[]> {
  "use cache";
  cacheTag("mentors");
  cacheLife("hours");
  if (!isDbConfigured()) return [];
  const db = getDb();
  return db.query.mentors.findMany({ orderBy: (m, { asc }) => [asc(m.order)] });
}

export async function getTestimonials(): Promise<Testimonial[]> {
  "use cache";
  cacheTag("testimonials");
  cacheLife("hours");
  if (!isDbConfigured()) return [];
  const db = getDb();
  return db.query.testimonials.findMany({ orderBy: (t, { asc }) => [asc(t.order)] });
}

// ---------------------------------------------------------------------------
// Pure helpers — operate on an already-fetched Track, no DB access.
// ---------------------------------------------------------------------------

export function getAllLessons(track: Track) {
  return track.modules.flatMap((m) => m.lessons.map((l) => ({ ...l, moduleSlug: m.slug })));
}

export function getLessonBySlug(track: Track, lessonSlug: string) {
  for (const mod of track.modules) {
    const lesson = mod.lessons.find((l) => l.slug === lessonSlug);
    if (lesson) return { module: mod, lesson };
  }
  return undefined;
}

export function nextIncompleteLesson(track: Track, completedSlugs: Set<string>) {
  for (const mod of track.modules) {
    for (const lesson of mod.lessons) {
      if (!completedSlugs.has(lesson.slug)) return { module: mod, lesson };
    }
  }
  return undefined;
}

export function trackTotalXp(track: Track) {
  return track.modules.reduce((sum, m) => sum + m.lessons.reduce((s, l) => s + l.xp, 0), 0);
}

export function trackLessonCount(track: Track) {
  return track.modules.reduce((n, m) => n + m.lessons.length, 0);
}
