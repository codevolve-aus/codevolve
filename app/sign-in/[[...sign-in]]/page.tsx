import { Suspense } from "react";
import { SignIn } from "@clerk/nextjs";
import { isClerkConfigured } from "@/lib/clerk-config";
import ClerkNotConfigured from "@/components/ClerkNotConfigured";

export default function SignInPage() {
  if (!isClerkConfigured()) return <ClerkNotConfigured />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-grid bg-background px-6 py-16">
      <Suspense fallback={<div className="h-[26rem] w-[25rem] animate-pulse rounded-xl bg-card" />}>
        <SignIn
          appearance={{
            variables: {
              colorPrimary: "#8b6bff",
              colorBackground: "#0f0f18",
              colorForeground: "#f1f2f9",
              borderRadius: "0.75rem",
            },
          }}
        />
      </Suspense>
    </div>
  );
}
