import { Suspense } from "react";
import { UserButton } from "@clerk/nextjs";
import Sidebar from "@/components/admin/Sidebar";
import ClerkNotConfigured from "@/components/ClerkNotConfigured";
import { isClerkConfigured } from "@/lib/clerk-config";
import { verifyAdmin } from "@/lib/admin";

// Same Suspense-wrapped AuthGate pattern as app/dashboard/layout.tsx — Cache Components
// requires the cookies-based auth check to happen inside a Suspense boundary.
async function AuthGate({ children }: { children: React.ReactNode }) {
  await verifyAdmin();
  return <>{children}</>;
}

function AdminSkeleton() {
  return (
    <div className="mx-auto flex max-w-5xl animate-pulse flex-col gap-6">
      <div className="h-24 rounded-xl bg-card/60" />
      <div className="h-64 rounded-xl bg-card/60" />
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!isClerkConfigured()) return <ClerkNotConfigured />;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1">
        <header className="flex h-16 items-center justify-between border-b border-border px-6">
          <span className="font-mono text-xs text-muted-foreground">
            <span className="text-primary">●</span> admin
          </span>
          <UserButton
            appearance={{
              variables: { colorPrimary: "#8b6bff", colorBackground: "#0f0f18" },
            }}
          />
        </header>
        <main className="p-6 sm:p-10">
          <Suspense fallback={<AdminSkeleton />}>
            <AuthGate>{children}</AuthGate>
          </Suspense>
        </main>
      </div>
    </div>
  );
}
