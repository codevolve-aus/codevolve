import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ForSchoolsCTA() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 rounded-2xl border border-border bg-gradient-to-br from-card to-secondary/40 p-10 text-center sm:p-14">
        <span className="font-mono text-xs uppercase tracking-widest text-cyan">
          For schools &amp; colleges
        </span>
        <h2 className="max-w-2xl text-balance text-2xl font-semibold text-foreground sm:text-3xl">
          Bring an industry-ready IT pathway to your students
        </h2>
        <p className="max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
          CodeVolve partners with schools and colleges to run after-hours and elective coding
          pathways — fully hosted, mentor-led, and mapped to real career outcomes.
        </p>
        <Link href="/for-schools" className={cn(buttonVariants({ size: "lg" }), "rounded-full px-6")}>
          Partner with CodeVolve
        </Link>
      </div>
    </section>
  );
}
