import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Codevolve — Engineering the AI Era",
  description:
    "Codevolve Pty Ltd builds AI-powered products that evolve the way software engineering is done. Transforming development workflows across industries.",
  keywords: ["AI", "software engineering", "developer tools", "artificial intelligence"],
  openGraph: {
    title: "Codevolve — Engineering the AI Era",
    description: "Building AI-powered products that evolve software engineering.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0a0a0f] text-[#f0f0f5]">{children}</body>
    </html>
  );
}
