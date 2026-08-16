import { Suspense } from "react";
import { UserButton } from "@clerk/nextjs";
import Sidebar from "@/components/dashboard/Sidebar";
import SidebarSkeleton from "@/components/dashboard/SidebarSkeleton";
import ClerkNotConfigured from "@/components/ClerkNotConfigured";
import { isClerkConfigured } from "@/lib/clerk-config";
import { verifySession } from "@/lib/dal";

// The auth check (and everything it gates) is pushed into an async leaf component wrapped in
// Suspense — Cache Components requires dynamic data (cookies-based auth here) to be read inside
// a Suspense boundary. Sidebar/header have no protected data, so they render immediately.
async function AuthGate({ children }: { children: React.ReactNode }) {
  await verifySession();
  return <>{children}</>;
}

function DashboardSkeleton() {
  return (
    <div className="mx-auto flex max-w-5xl animate-pulse flex-col gap-6">
      <div className="h-24 rounded-xl bg-card/60" />
      <div className="h-40 rounded-xl bg-card/60" />
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  if (!isClerkConfigured()) return <ClerkNotConfigured />;

  return (
    <div className="flex min-h-screen bg-background">
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
      <div className="flex-1">
        <header className="flex h-16 items-center justify-between border-b border-border px-6">
          <span className="font-mono text-xs text-muted-foreground">
            <span className="text-commit-green">●</span> connected
          </span>
          <UserButton
            appearance={{
              variables: { colorPrimary: "#8b6bff", colorBackground: "#0f0f18" },
            }}
          />
        </header>
        <main className="p-6 sm:p-10">
          <Suspense fallback={<DashboardSkeleton />}>
            <AuthGate>{children}</AuthGate>
          </Suspense>
        </main>
      </div>
    </div>
  );
}
