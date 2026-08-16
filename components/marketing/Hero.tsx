import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import TerminalWindow from "@/components/marketing/TerminalWindow";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-grid px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-10%] left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-commit-green" />
            Now enrolling — school & college students
          </div>

          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            You{" "}
            <span className="font-mono text-gradient">
              {"{ learn(); build(); ship(); }"}
            </span>{" "}
            — while you&apos;re still in school.
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            CodeVolve is the IT training track for school students and college grads. Real
            projects, real mentors, a curriculum that evolves with you —{" "}
            <span className="font-mono text-foreground">init → commit → merge → deploy</span> —
            into an industry-ready engineer.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/sign-up" className={cn(buttonVariants({ size: "lg" }), "rounded-full px-6 glow-violet")}>
              Start your evolution
            </Link>
            <Link
              href="/tracks"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-6")}
            >
              Explore tracks
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-xs text-muted-foreground">
            <span>6 career tracks</span>
            <span className="text-border">|</span>
            <span>40+ industry mentors</span>
            <span className="text-border">|</span>
            <span>Built for after school &amp; college hours</span>
          </div>
        </div>

        <TerminalWindow title="student.log — evolution history" className="lg:justify-self-end">
          <pre className="whitespace-pre-wrap">
            <span className="text-muted-foreground">$ codevolve status</span>
            {"\n\n"}
            <span style={{ color: "var(--stage-init)" }}>[init]</span> first commit —
            &quot;hello, web&quot;
            {"\n"}
            <span style={{ color: "var(--stage-commit)" }}>[commit]</span> 47 lessons shipped,
            12-day streak
            {"\n"}
            <span style={{ color: "var(--stage-merge)" }}>[merge]</span> teamed up on group
            project &quot;campus-events&quot;
            {"\n"}
            <span style={{ color: "var(--stage-deploy)" }}>[deploy]</span> portfolio live at
            you.codevolve.dev
            {"\n\n"}
            <span className="text-muted-foreground"># next: mock interview, Thursday 4pm</span>
            <span className="terminal-caret" />
          </pre>
        </TerminalWindow>
      </div>
    </section>
  );
}
