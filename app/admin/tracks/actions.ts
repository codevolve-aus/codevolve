"use server";

import { redirect } from "next/navigation";
import { updateTag, revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { getDb } from "@/src/db";
import { tracks } from "@/src/db/schema";
import { verifyAdmin } from "@/lib/admin";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createTrack(formData: FormData) {
  await verifyAdmin();

  const title = String(formData.get("title") ?? "").trim();
  const tagline = String(formData.get("tagline") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const level = String(formData.get("level") ?? "Beginner").trim();
  const durationWeeks = Number(formData.get("durationWeeks") ?? 8) || 8;
  const gradient = String(formData.get("gradient") ?? "from-violet-500 to-cyan-400").trim();
  const icon = String(formData.get("icon") ?? "code-2").trim();
  const comingSoon = formData.get("comingSoon") === "on";
  const enabled = formData.get("enabled") === "on";
  const outcomes = String(formData.get("outcomes") ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  if (!title || !tagline || !description || !category) {
    throw new Error("Title, tagline, description, and category are required.");
  }

  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug = slugify(slugInput || title);

  const db = getDb();
  await db.insert(tracks).values({
    slug,
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
  });

  updateTag("tracks");
  redirect("/admin/tracks");
}

export async function deleteTrack(trackId: string) {
  await verifyAdmin();
  const db = getDb();
  await db.delete(tracks).where(eq(tracks.id, trackId));
  updateTag("tracks");
  redirect("/admin/tracks");
}

export async function setTrackEnabled(trackId: string, enabled: boolean) {
  await verifyAdmin();
  const db = getDb();
  await db.update(tracks).set({ enabled, updatedAt: new Date() }).where(eq(tracks.id, trackId));
  updateTag("tracks");
  revalidatePath("/admin/tracks");
}
