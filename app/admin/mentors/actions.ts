"use server";

import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { eq } from "drizzle-orm";
import { getDb } from "@/src/db";
import { mentors } from "@/src/db/schema";
import { verifyAdmin } from "@/lib/admin";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function readMentorForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const companyType = String(formData.get("companyType") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();
  const initials = String(formData.get("initials") ?? "").trim().toUpperCase();
  const focus = String(formData.get("focus") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (!name || !role || !bio || !initials) {
    throw new Error("Name, role, initials, and bio are required.");
  }

  return { name, role, companyType, bio, initials, focus };
}

export async function createMentor(formData: FormData) {
  await verifyAdmin();
  const fields = readMentorForm(formData);
  const db = getDb();
  await db.insert(mentors).values({ ...fields, slug: slugify(fields.name) });
  updateTag("mentors");
  redirect("/admin/mentors");
}

export async function updateMentor(mentorId: string, formData: FormData) {
  await verifyAdmin();
  const fields = readMentorForm(formData);
  const db = getDb();
  await db.update(mentors).set(fields).where(eq(mentors.id, mentorId));
  updateTag("mentors");
  redirect("/admin/mentors");
}

export async function deleteMentor(mentorId: string) {
  await verifyAdmin();
  const db = getDb();
  await db.delete(mentors).where(eq(mentors.id, mentorId));
  updateTag("mentors");
  redirect("/admin/mentors");
}
