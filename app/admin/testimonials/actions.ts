"use server";

import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { eq } from "drizzle-orm";
import { getDb } from "@/src/db";
import { testimonials } from "@/src/db/schema";
import { verifyAdmin } from "@/lib/admin";

function readForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const context = String(formData.get("context") ?? "").trim();
  const quote = String(formData.get("quote") ?? "").trim();
  const outcome = String(formData.get("outcome") ?? "").trim();
  const track = String(formData.get("track") ?? "").trim();

  if (!name || !quote || !outcome) {
    throw new Error("Name, quote, and outcome are required.");
  }

  return { name, context, quote, outcome, track };
}

export async function createTestimonial(formData: FormData) {
  await verifyAdmin();
  const fields = readForm(formData);
  const db = getDb();
  await db.insert(testimonials).values(fields);
  updateTag("testimonials");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  await verifyAdmin();
  const fields = readForm(formData);
  const db = getDb();
  await db.update(testimonials).set(fields).where(eq(testimonials.id, id));
  updateTag("testimonials");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  await verifyAdmin();
  const db = getDb();
  await db.delete(testimonials).where(eq(testimonials.id, id));
  updateTag("testimonials");
  redirect("/admin/testimonials");
}
