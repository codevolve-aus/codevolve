import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ClerkNotConfigured() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <p className="font-mono text-xs text-muted-foreground">accounts not open yet</p>
      <h1 className="text-2xl font-semibold text-foreground">Student accounts are coming soon</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        CodeVolve isn&apos;t taking sign-ups just yet. In the meantime, explore the tracks or get
        in touch and we&apos;ll let you know when enrollment opens.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Link href="/tracks" className={cn(buttonVariants(), "rounded-full")}>
          Explore tracks
        </Link>
        <Link href="/contact" className={cn(buttonVariants({ variant: "outline" }), "rounded-full")}>
          Get in touch
        </Link>
      </div>
    </div>
  );
}
