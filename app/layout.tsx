import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { isClerkConfigured } from "@/lib/clerk-config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://codevolve.com.au"),
  title: {
    default: "CodeVolve — Evolve Into an Industry-Ready Developer",
    template: "%s · CodeVolve",
  },
  description:
    "CodeVolve is the IT training track for school students and college grads. Learn to code alongside school, ship real projects with industry mentors, and evolve — init, commit, merge, deploy — into an industry-ready engineer.",
  keywords: [
    "IT training",
    "coding for school students",
    "college grad tech bootcamp",
    "learn to code",
    "industry ready",
    "software engineering career",
    "CodeVolve",
  ],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  openGraph: {
    title: "CodeVolve — Evolve Into an Industry-Ready Developer",
    description:
      "The IT training track for school students & college grads. init → commit → merge → deploy your career.",
    type: "website",
    siteName: "CodeVolve",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeVolve — Evolve Into an Industry-Ready Developer",
    description:
      "The IT training track for school students & college grads. init → commit → merge → deploy your career.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/* ClerkProvider lives inside <body>, not wrapping <html> — required for
            Cache Components / PPR compatibility (Clerk Core 3). Skipped entirely until Clerk
            is provisioned (no student accounts needed yet) — it throws without real keys. */}
        {isClerkConfigured() ? (
          <ClerkProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </ClerkProvider>
        ) : (
          <TooltipProvider>{children}</TooltipProvider>
        )}
      </body>
    </html>
  );
}
