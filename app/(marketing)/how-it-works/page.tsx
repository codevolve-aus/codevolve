import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/marketing/SectionHeading";
import EvolutionPath from "@/components/marketing/EvolutionPath";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { STAGE_ORDER, STAGE_META } from "@/lib/evolution";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "The CodeVolve evolution path — init, commit, merge, deploy — explained. How school students and college grads go from first line of code to industry-ready.",
};

const details: Record<string, { format: string; youDo: string[] }> = {
  init: {
    format: "Self-paced lessons, 2–3 hrs/week, no prior experience needed.",
    youDo: [
      "Set up your dev environment and tools",
      "Learn core syntax through short, hands-on lessons",
      "Ship your first tiny working project",
    ],
  },
  commit: {
    format: "Daily micro-exercises + weekly mentor check-in.",
    youDo: [
      "Build small, real features every session",
      "Get code review from a mentor, not just autograding",
      "Build the habit of shipping consistently",
    ],
  },
  merge: {
    format: "Small team projects with live mentor sessions.",
    youDo: [
      "Work in a small team on a real, shared project",
      "Practice code review and git collaboration",
      "Handle the messiness of real software, not tutorials",
    ],
  },
  deploy: {
    format: "1:1 mentor sessions, mock interviews, portfolio review.",
    youDo: [
      "Deploy a project you can point an employer to",
      "Run through mock technical interviews",
      "Get warm intros for internships where available",
    ],
  },
};

export default function HowItWorksPage() {
  return (
    <div className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="How it works"
          title="The evolution path"
          description="Every CodeVolve track runs on the same four-stage path — literally named after the git workflow professional engineers use every day."
        />

        <div className="mt-14">
          <EvolutionPath />
        </div>

        <div className="mt-20 flex flex-col gap-14">
          {STAGE_ORDER.map((stage, i) => {
            const meta = STAGE_META[stage];
            const d = details[stage];
            return (
              <div key={stage} className="grid gap-6 sm:grid-cols-[auto_1fr]">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full border font-mono text-sm font-semibold"
                  style={{ borderColor: meta.color, color: meta.color }}
                >
                  {i + 1}
                </div>
                <div>
                  <code className="font-mono text-sm" style={{ color: meta.color }}>
                    {meta.command}
                  </code>
                  <h2 className="mt-1 text-xl font-semibold text-foreground">{meta.label} Stage</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{meta.blurb}</p>
                  <p className="mt-3 font-mono text-xs text-muted-foreground">{d.format}</p>
                  <ul className="mt-4 flex flex-col gap-2">
                    {d.youDo.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-commit-green" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 rounded-2xl border border-border bg-card/60 p-10 text-center">
          <h2 className="text-xl font-semibold text-foreground">Ready to init?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Pick a track and make your first commit today.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/tracks" className={cn(buttonVariants({ size: "lg" }), "rounded-full px-6")}>
              Explore tracks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
