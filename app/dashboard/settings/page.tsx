import type { Metadata } from "next";
import { UserProfile } from "@clerk/nextjs";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-semibold text-foreground">Settings</h1>
      <UserProfile
        routing="hash"
        appearance={{
          variables: { colorPrimary: "#8b6bff", colorBackground: "#0f0f18" },
          elements: { rootBox: "w-full", card: "shadow-none border border-border" },
        }}
      />
    </div>
  );
}
