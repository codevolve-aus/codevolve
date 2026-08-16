import Link from "next/link";
import type { Metadata } from "next";
import { sql, inArray } from "drizzle-orm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DbNotConfigured from "@/components/dashboard/DbNotConfigured";
import { getDb } from "@/src/db";
import { enrollments, lessonProgress } from "@/src/db/schema";
import { isDbConfigured } from "@/lib/content";
import { listStudents } from "@/lib/clerk-admin";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Students · Admin" };

export default async function AdminStudentsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const dbReady = isDbConfigured();
  const { students, totalCount } = await listStudents({ query: q, limit: 50 });

  let statsByUser = new Map<string, { tracks: number; xp: number }>();
  if (dbReady && students.length > 0) {
    const ids = students.map((s) => s.id);
    const db = getDb();
    const [trackRows, xpRows] = await Promise.all([
      db
        .select({ userId: enrollments.userId, tracks: sql<number>`count(*)::int` })
        .from(enrollments)
        .where(inArray(enrollments.userId, ids))
        .groupBy(enrollments.userId),
      db
        .select({ userId: lessonProgress.userId, xp: sql<number>`coalesce(sum(${lessonProgress.xp}),0)::int` })
        .from(lessonProgress)
        .where(inArray(lessonProgress.userId, ids))
        .groupBy(lessonProgress.userId),
    ]);
    statsByUser = new Map(
      students.map((s) => [
        s.id,
        {
          tracks: trackRows.find((r) => r.userId === s.id)?.tracks ?? 0,
          xp: xpRows.find((r) => r.userId === s.id)?.xp ?? 0,
        },
      ]),
    );
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Students</h1>
        <p className="mt-1 text-sm text-muted-foreground">{totalCount} total accounts.</p>
      </div>

      <form method="GET" className="flex gap-2">
        <Input name="q" defaultValue={q} placeholder="Search by name or email…" />
        <Button type="submit" variant="outline">
          Search
        </Button>
      </form>

      {!dbReady && <DbNotConfigured />}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Tracks</TableHead>
            <TableHead>XP</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((s) => {
            const stats = statsByUser.get(s.id);
            return (
              <TableRow key={s.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 border border-border">
                      <AvatarImage src={s.imageUrl} alt="" />
                      <AvatarFallback className="bg-secondary font-mono text-xs text-foreground">
                        {(s.firstName?.[0] ?? "?").toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-foreground">
                      {[s.firstName, s.lastName].filter(Boolean).join(" ") || "Unnamed"}
                    </span>
                    {s.isAdmin && <Badge className="ml-1">Admin</Badge>}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{s.email ?? "—"}</TableCell>
                <TableCell className="text-muted-foreground">{stats?.tracks ?? "—"}</TableCell>
                <TableCell className="text-muted-foreground">{stats?.xp ?? "—"}</TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/admin/students/${s.id}`}
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                  >
                    View
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
