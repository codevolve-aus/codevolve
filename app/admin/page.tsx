import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTracks, getMentors, getTestimonials, isDbConfigured } from "@/lib/content";
import { getStudentCount } from "@/lib/clerk-admin";
import DbNotConfigured from "@/components/dashboard/DbNotConfigured";

export const metadata: Metadata = { title: "Admin" };

export default async function AdminOverviewPage() {
  const dbReady = isDbConfigured();
  const [tracks, mentors, testimonials, studentCount] = await Promise.all([
    dbReady ? getAllTracks({ includeDisabled: true }) : Promise.resolve([]),
    dbReady ? getMentors() : Promise.resolve([]),
    dbReady ? getTestimonials() : Promise.resolve([]),
    getStudentCount().catch(() => null),
  ]);

  const stats = [
    { label: "Students", value: studentCount ?? "—", href: "/admin/students" },
    { label: "Tracks", value: tracks.length, href: "/admin/tracks" },
    { label: "Mentors", value: mentors.length, href: "/admin/mentors" },
    { label: "Testimonials", value: testimonials.length, href: "/admin/testimonials" },
  ];

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Admin overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage curriculum content, mentors, testimonials, and the student roster.
        </p>
      </div>

      {!dbReady && <DbNotConfigured />}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}>
            <Card className="border-border bg-card/60 transition-colors hover:border-primary/40">
              <CardHeader>
                <CardTitle className="font-mono text-xs font-normal text-muted-foreground">
                  {s.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-3xl font-semibold text-foreground">{s.value}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
