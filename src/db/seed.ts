// Run with `npm run db:seed`. Upserts by slug, so it's safe to re-run after editing
// seed-data.ts — it won't duplicate rows, but it also won't overwrite live edits made
// from /admin to a track/mentor/testimonial that shares a seed slug.
import { eq, and } from "drizzle-orm";
import { getDb } from "./index";
import { tracks, modules, lessons, mentors, testimonials } from "./schema";
import { SEED_TRACKS, SEED_MENTORS, SEED_TESTIMONIALS } from "./seed-data";

async function main() {
  const db = getDb();

  for (const [trackOrder, t] of SEED_TRACKS.entries()) {
    const existingTrack = await db.query.tracks.findFirst({ where: eq(tracks.slug, t.slug) });
    const trackRow = existingTrack
      ? existingTrack
      : (
          await db
            .insert(tracks)
            .values({
              slug: t.slug,
              title: t.title,
              tagline: t.tagline,
              description: t.description,
              category: t.category,
              level: t.level,
              durationWeeks: t.durationWeeks,
              gradient: t.gradient,
              icon: t.icon,
              comingSoon: t.comingSoon ?? false,
              outcomes: t.outcomes,
              order: trackOrder,
            })
            .returning()
        )[0];

    for (const [moduleOrder, m] of t.modules.entries()) {
      const existingModule = await db.query.modules.findFirst({
        where: and(eq(modules.trackId, trackRow.id), eq(modules.slug, m.slug)),
      });
      const moduleRow = existingModule
        ? existingModule
        : (
            await db
              .insert(modules)
              .values({
                trackId: trackRow.id,
                slug: m.slug,
                title: m.title,
                summary: m.summary,
                stage: m.stage,
                order: moduleOrder,
              })
              .returning()
          )[0];

      for (const [lessonOrder, l] of m.lessons.entries()) {
        const existingLesson = await db.query.lessons.findFirst({
          where: and(eq(lessons.moduleId, moduleRow.id), eq(lessons.slug, l.slug)),
        });
        if (existingLesson) continue;
        await db.insert(lessons).values({
          moduleId: moduleRow.id,
          slug: l.slug,
          title: l.title,
          summary: l.summary,
          content: l.content,
          minutes: l.minutes,
          xp: l.xp,
          order: lessonOrder,
        });
      }
    }
    console.log(`✓ track: ${t.slug}`);
  }

  for (const [order, m] of SEED_MENTORS.entries()) {
    const existing = await db.query.mentors.findFirst({ where: eq(mentors.slug, m.slug) });
    if (existing) continue;
    await db.insert(mentors).values({ ...m, order });
  }
  console.log(`✓ ${SEED_MENTORS.length} mentors`);

  const existingTestimonials = await db.query.testimonials.findMany();
  if (existingTestimonials.length === 0) {
    for (const [order, t] of SEED_TESTIMONIALS.entries()) {
      await db.insert(testimonials).values({ ...t, order });
    }
    console.log(`✓ ${SEED_TESTIMONIALS.length} testimonials`);
  } else {
    console.log("• testimonials already seeded, skipping");
  }

  console.log("Done.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
