import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/marketing/SectionHeading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description: "CodeVolve pricing for students, families, and school partnerships.",
};

const plans = [
  {
    name: "Init",
    price: "Free",
    period: "",
    description: "Get a real feel for CodeVolve before committing.",
    features: [
      "Full access to the first module of every track",
      "Community Discord access",
      "Evolution path progress tracking",
    ],
    cta: "Start free",
    href: "/sign-up",
    highlight: false,
  },
  {
    name: "Student",
    price: "$29",
    period: "/month",
    description: "The full evolution path — everything you need to go industry-ready.",
    features: [
      "Full access to all open tracks",
      "Weekly live mentor sessions",
      "Portfolio & mock interview prep",
      "Deployable project reviews",
    ],
    cta: "Start your evolution",
    href: "/sign-up",
    highlight: true,
  },
  {
    name: "School Partnership",
    price: "Custom",
    period: "",
    description: "Bring CodeVolve to your whole cohort as an elective or after-school program.",
    features: [
      "Bulk seats with school/college billing",
      "Progress dashboards for teachers",
      "Curriculum mapped to your schedule",
    ],
    cta: "Talk to us",
    href: "/for-schools",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Pricing"
          title="Pricing built for students, not enterprises"
          description="Illustrative launch pricing — final pricing is confirmed at checkout and for school partnerships during setup."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "border-border bg-card/60",
                plan.highlight && "border-primary/50 ring-1 ring-primary/30",
              )}
            >
              <CardHeader>
                {plan.highlight && (
                  <span className="mb-2 w-fit rounded-full bg-primary/15 px-2.5 py-0.5 font-mono text-[10px] text-primary">
                    MOST POPULAR
                  </span>
                )}
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-semibold text-foreground">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
                <ul className="mt-6 flex flex-col gap-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-commit-green" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={cn(
                    buttonVariants({ variant: plan.highlight ? "default" : "outline", size: "lg" }),
                    "mt-8 w-full rounded-full",
                  )}
                >
                  {plan.cta}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
