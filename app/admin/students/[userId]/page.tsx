import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { eq } from "drizzle-orm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CommitTimeline from "@/components/dashboard/CommitTimeline";
import DbNotConfigured from "@/components/dashboard/DbNotConfigured";
import { getDb } from "@/src/db";
import { enrollments, lessonProgress } from "@/src/db/schema";
import { isDbConfigured } from "@/lib/content";
import { getStudent } from "@/lib/clerk-admin";
import { evolutionFromXp } from "@/lib/xp";
import { verifyAdmin } from "@/lib/admin";
import { toggleAdmin } from "./actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ userId: string }>;
}): Promise<Metadata> {
  const { userId } = await params;
  const student = await getStudent(userId);
  return { title: student ? `${student.firstName ?? student.email} · Admin` : "Student · Admin" };
}

export default async function AdminStudentDetailPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const { userId: actingAdminId } = await verifyAdmin();
  const student = await getStudent(userId);
  if (!student) notFound();

  const dbReady = isDbConfigured();
  let myEnrollments: { trackSlug: string; enrolledAt: Date }[] = [];
  let myProgress: { trackSlug: string; lessonSlug: string; xp: number; completedAt: Date }[] = [];
  if (dbReady) {
    const db = getDb();
    [myEnrollments, myProgress] = await Promise.all([
      db.select().from(enrollments).where(eq(enrollments.userId, userId)),
      db.select().from(lessonProgress).where(eq(lessonProgress.userId, userId)),
    ]);
  }

  const totalXp = myProgress.reduce((sum, p) => sum + p.xp, 0);
  const evolution = evolutionFromXp(totalXp);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14 border border-border">
          <AvatarImage src={student.imageUrl} alt="" />
          <AvatarFallback className="bg-secondary font-mono text-foreground">
            {(student.firstName?.[0] ?? "?").toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            {[student.firstName, student.lastName].filter(Boolean).join(" ") || "Unnamed student"}
          </h1>
          <p className="text-sm text-muted-foreground">{student.email ?? "No email on file"}</p>
        </div>
        {student.isAdmin && <Badge className="ml-auto">Admin</Badge>}
      </div>

      <div className="rounded-xl border border-border bg-card/60 p-6">
        <p className="font-mono text-xs text-muted-foreground">evolution stage</p>
        <p className="mt-1 font-mono text-lg font-semibold" style={{ color: evolution.stageMeta.color }}>
          {evolution.stageMeta.command}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {totalXp} XP · {myEnrollments.length} track{myEnrollments.length === 1 ? "" : "s"}
        </p>
      </div>

      {!dbReady && <DbNotConfigured />}

      <section>
        <h2 className="text-lg font-semibold text-foreground">Activity</h2>
        <div className="mt-4 rounded-xl border border-border bg-card/60 p-6">
          <CommitTimeline
            rows={[...myProgress]
              .sort((a, b) => +new Date(b.completedAt) - +new Date(a.completedAt))
              .map((p) => ({
                trackSlug: p.trackSlug,
                lessonSlug: p.lessonSlug,
                xp: p.xp,
                completedAt: new Date(p.completedAt),
              }))}
          />
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card/60 p-6">
        <h2 className="text-sm font-semibold text-foreground">Admin access</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Admins can manage tracks, mentors, testimonials, and the student roster.
        </p>
        <form action={toggleAdmin.bind(null, userId, !student.isAdmin)} className="mt-4">
          <Button
            type="submit"
            variant={student.isAdmin ? "destructive" : "default"}
            disabled={student.isAdmin && userId === actingAdminId}
            className="rounded-full"
          >
            {student.isAdmin ? "Remove admin access" : "Grant admin access"}
          </Button>
          {student.isAdmin && userId === actingAdminId && (
            <p className="mt-2 text-xs text-muted-foreground">
              You can&apos;t remove your own admin access.
            </p>
          )}
        </form>
      </section>
    </div>
  );
}
