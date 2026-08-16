import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/marketing/SectionHeading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "For Schools & Colleges",
  description:
    "Partner with CodeVolve to bring an industry-ready IT training pathway to your students — as an elective, after-school program, or holiday intensive.",
};

const models = [
  {
    title: "After-school program",
    body: "Weekly on-campus or remote sessions, run alongside the regular timetable — no curriculum rewrite required.",
  },
  {
    title: "Elective / timetabled subject",
    body: "CodeVolve tracks mapped to your subject outcomes, with teacher-facing progress dashboards.",
  },
  {
    title: "Holiday intensive",
    body: "A short, high-energy sprint through a full track during term breaks — a taste of real software engineering.",
  },
];

export default function ForSchoolsPage() {
  return (
    <div className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="For schools & colleges"
          title="Bring an industry-ready pathway to your students"
          description="CodeVolve partners with schools and colleges across Australia to run mentor-led IT training — fully hosted, easy to schedule, mapped to real outcomes."
          align="left"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {models.map((m) => (
            <Card key={m.title} className="border-border bg-card/60">
              <CardHeader>
                <CardTitle className="text-base">{m.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{m.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="mt-16">
          <h2 className="text-lg font-semibold text-foreground">What’s included</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "Full curriculum access across all tracks",
              "Industry mentors for live sessions",
              "Teacher/coordinator progress dashboard",
              "Bulk enrollment & school billing",
              "Onboarding support for your staff",
              "End-of-term showcase for student projects",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-commit-green" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-16 rounded-2xl border border-border bg-card/60 p-10 text-center">
          <h2 className="text-xl font-semibold text-foreground">
            Let’s design a pathway for your students
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Tell us about your school and we’ll put together a plan within a week.
          </p>
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "lg" }), "mt-6 rounded-full px-6")}
          >
            Get in touch
          </Link>
        </div>
      </div>
    </div>
  );
}
