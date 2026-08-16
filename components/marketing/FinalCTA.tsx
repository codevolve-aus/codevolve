import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-grid px-6 py-24 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[140px]"
      />
      <div className="relative mx-auto max-w-2xl">
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Your first commit is one click away.
        </h2>
        <p className="mt-4 text-pretty text-muted-foreground">
          Free to start. No credit card. Just <span className="font-mono">git init</span> on your
          career.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/sign-up" className={cn(buttonVariants({ size: "lg" }), "rounded-full px-7 glow-violet")}>
            Start your evolution
          </Link>
          <Link
            href="/contact"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-7")}
          >
            Talk to us
          </Link>
        </div>
      </div>
    </section>
  );
}
