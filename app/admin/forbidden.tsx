import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AdminForbidden() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <p className="font-mono text-xs text-muted-foreground">403</p>
      <h1 className="text-2xl font-semibold text-foreground">Admin access required</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        Your account doesn&apos;t have admin access. If you think this is a mistake, ask an
        existing admin to grant it from Students → your profile, or via the Clerk Dashboard.
      </p>
      <Link href="/dashboard" className={cn(buttonVariants(), "mt-2 rounded-full")}>
        Back to dashboard
      </Link>
    </div>
  );
}
