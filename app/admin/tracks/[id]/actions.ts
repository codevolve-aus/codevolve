"use server";

import { revalidatePath } from "next/cache";
import { updateTag } from "next/cache";
import { eq, sql } from "drizzle-orm";
import { getDb } from "@/src/db";
import { tracks, modules, lessons } from "@/src/db/schema";
import { verifyAdmin } from "@/lib/admin";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function afterMutate(trackId: string) {
  updateTag("tracks");
  revalidatePath(`/admin/tracks/${trackId}`);
}

export async function updateTrack(trackId: string, formData: FormData) {
  await verifyAdmin();

  const title = String(formData.get("title") ?? "").trim();
  const tagline = String(formData.get("tagline") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const level = String(formData.get("level") ?? "Beginner").trim();
  const durationWeeks = Number(formData.get("durationWeeks") ?? 8) || 8;
  const gradient = String(formData.get("gradient") ?? "").trim();
  const icon = String(formData.get("icon") ?? "").trim();
  const comingSoon = formData.get("comingSoon") === "on";
  const enabled = formData.get("enabled") === "on";
  const outcomes = String(formData.get("outcomes") ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  if (!title || !tagline || !description || !category) {
    throw new Error("Title, tagline, description, and category are required.");
  }

  const db = getDb();
  await db
    .update(tracks)
    .set({
      title,
      tagline,
      description,
      category,
      level,
      durationWeeks,
      gradient,
      icon,
      comingSoon,
      enabled,
      outcomes,
      updatedAt: new Date(),
    })
    .where(eq(tracks.id, trackId));

  afterMutate(trackId);
}

export async function createModule(trackId: string, formData: FormData) {
  await verifyAdmin();
  const title = String(formData.get("title") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  const stage = String(formData.get("stage") ?? "init").trim();
  if (!title) throw new Error("Module title is required.");

  const db = getDb();
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(modules)
    .where(eq(modules.trackId, trackId));

  await db.insert(modules).values({
    trackId,
    slug: slugify(title),
    title,
    summary,
    stage,
    order: count,
  });

  afterMutate(trackId);
}

export async function updateModule(trackId: string, moduleId: string, formData: FormData) {
  await verifyAdmin();
  const title = String(formData.get("title") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  const stage = String(formData.get("stage") ?? "init").trim();
  if (!title) throw new Error("Module title is required.");

  const db = getDb();
  await db.update(modules).set({ title, summary, stage }).where(eq(modules.id, moduleId));

  afterMutate(trackId);
}

export async function deleteModule(trackId: string, moduleId: string) {
  await verifyAdmin();
  const db = getDb();
  await db.delete(modules).where(eq(modules.id, moduleId));
  afterMutate(trackId);
}

export async function createLesson(trackId: string, moduleId: string, formData: FormData) {
  await verifyAdmin();
  const title = String(formData.get("title") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const minutes = Number(formData.get("minutes") ?? 20) || 20;
  const xp = Number(formData.get("xp") ?? 20) || 20;
  if (!title || !content) throw new Error("Lesson title and content are required.");

  const db = getDb();
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(lessons)
    .where(eq(lessons.moduleId, moduleId));

  await db.insert(lessons).values({
    moduleId,
    slug: slugify(title),
    title,
    summary,
    content,
    minutes,
    xp,
    order: count,
  });

  afterMutate(trackId);
}

export async function updateLesson(trackId: string, lessonId: string, formData: FormData) {
  await verifyAdmin();
  const title = String(formData.get("title") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const minutes = Number(formData.get("minutes") ?? 20) || 20;
  const xp = Number(formData.get("xp") ?? 20) || 20;
  if (!title || !content) throw new Error("Lesson title and content are required.");

  const db = getDb();
  await db
    .update(lessons)
    .set({ title, summary, content, minutes, xp })
    .where(eq(lessons.id, lessonId));

  afterMutate(trackId);
}

export async function deleteLesson(trackId: string, lessonId: string) {
  await verifyAdmin();
  const db = getDb();
  await db.delete(lessons).where(eq(lessons.id, lessonId));
  afterMutate(trackId);
}
