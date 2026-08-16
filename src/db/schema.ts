import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  boolean,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ---------------------------------------------------------------------------
// Content — editable from /admin. Seeded from src/db/seed-data.ts.
// ---------------------------------------------------------------------------

export const tracks = pgTable("tracks", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  level: text("level").notNull(),
  durationWeeks: integer("duration_weeks").notNull(),
  gradient: text("gradient").notNull(),
  icon: text("icon").notNull(),
  comingSoon: boolean("coming_soon").notNull().default(false),
  // Admin kill switch — disabled tracks are hidden from the public site (404) and frozen for
  // already-enrolled students too. Distinct from `comingSoon`, which is a deliberate public teaser.
  enabled: boolean("enabled").notNull().default(true),
  outcomes: text("outcomes").array().notNull().default([]),
  order: integer("order").notNull().default(0),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const modules = pgTable(
  "modules",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    trackId: uuid("track_id")
      .notNull()
      .references(() => tracks.id, { onDelete: "cascade" }),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    summary: text("summary").notNull(),
    stage: text("stage").notNull(), // EvolutionStage — "init" | "commit" | "merge" | "deploy"
    order: integer("order").notNull().default(0),
  },
  (t) => [uniqueIndex("modules_track_slug_idx").on(t.trackId, t.slug)],
);

export const lessons = pgTable(
  "lessons",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    moduleId: uuid("module_id")
      .notNull()
      .references(() => modules.id, { onDelete: "cascade" }),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    summary: text("summary").notNull(),
    content: text("content").notNull(),
    minutes: integer("minutes").notNull(),
    xp: integer("xp").notNull(),
    order: integer("order").notNull().default(0),
  },
  (t) => [uniqueIndex("lessons_module_slug_idx").on(t.moduleId, t.slug)],
);

export const mentors = pgTable("mentors", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  companyType: text("company_type").notNull(),
  bio: text("bio").notNull(),
  focus: text("focus").array().notNull().default([]),
  initials: text("initials").notNull(),
  order: integer("order").notNull().default(0),
});

export const tracksRelations = relations(tracks, ({ many }) => ({
  modules: many(modules),
}));

export const modulesRelations = relations(modules, ({ one, many }) => ({
  track: one(tracks, { fields: [modules.trackId], references: [tracks.id] }),
  lessons: many(lessons),
}));

export const lessonsRelations = relations(lessons, ({ one }) => ({
  module: one(modules, { fields: [lessons.moduleId], references: [modules.id] }),
}));

export const testimonials = pgTable("testimonials", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  context: text("context").notNull(),
  quote: text("quote").notNull(),
  outcome: text("outcome").notNull(),
  track: text("track").notNull(),
  order: integer("order").notNull().default(0),
});

// ---------------------------------------------------------------------------
// Per-student state — keyed by the content slugs above, not foreign keys, so
// enrollments/progress survive content edits (e.g. a lesson being reworded).
// ---------------------------------------------------------------------------

export const enrollments = pgTable(
  "enrollments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull(),
    trackSlug: text("track_slug").notNull(),
    enrolledAt: timestamp("enrolled_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex("enrollments_user_track_idx").on(t.userId, t.trackSlug)],
);

export const lessonProgress = pgTable(
  "lesson_progress",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull(),
    trackSlug: text("track_slug").notNull(),
    lessonSlug: text("lesson_slug").notNull(),
    xp: integer("xp").notNull().default(0),
    completedAt: timestamp("completed_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex("lesson_progress_user_lesson_idx").on(t.userId, t.trackSlug, t.lessonSlug)],
);
