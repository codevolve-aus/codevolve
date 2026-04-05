import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Scout — Discover Local Deals Near You",
  description:
    "Scout helps you find the best deals from local businesses around you. Browse, save, and never miss a deal again.",
  openGraph: {
    title: "Scout — Discover Local Deals Near You",
    description: "Discover exclusive deals from local businesses around you.",
    type: "website",
  },
};

export default function ScoutLanding() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f0f0f5] overflow-x-hidden">

      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-bold text-white text-lg tracking-tight">Scout</span>
            <span className="text-white/20 text-sm">by</span>
            <Link href="https://codevolve.com.au" className="text-white/40 hover:text-white/70 text-sm transition-colors">
              CodeVolve
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-white/40 hover:text-white/70 text-sm transition-colors hidden sm:block">
              Privacy
            </Link>
            <Link href="/terms" className="text-white/40 hover:text-white/70 text-sm transition-colors hidden sm:block">
              Terms
            </Link>
            <a
              href="#download"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-medium hover:opacity-90 transition-all"
            >
              Get the app
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[140px]" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/15 blur-[120px]" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-fuchsia-500/10 blur-[100px]" />
        </div>

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Now available on Android
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white mb-6 leading-[1.05]">
            Deals hiding{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-400 bg-clip-text text-transparent">
              right around you.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            Scout finds exclusive offers from local businesses near you — restaurants, retail, beauty,
            fitness, and more. Save your favourites and never miss a deal again.
          </p>

          <div id="download" className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#"
              className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all hover:scale-105 shadow-xl"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76c.3.17.64.24.99.2l12.6-12.6L13.2 7.8 3.18 23.76zM20.46 10.8l-2.76-1.56-3.3 3.3 3.3 3.3 2.79-1.59c.8-.45.8-1.98-.03-2.45zM3 1.2C2.76 1.5 2.64 1.86 2.64 2.28V21.72c0 .42.12.78.36 1.08l.06.06L14.1 11.82v-.3L3.06 1.14 3 1.2zM16.77 7.26l-3.57-3.6L3.18.24C2.82.18 2.49.27 2.19.45L13.2 11.46l3.57-4.2z"/>
              </svg>
              Google Play
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-6 py-3.5 rounded-2xl border border-white/10 text-white/70 hover:text-white hover:border-white/20 font-semibold text-sm transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              App Store — Coming Soon
            </a>
          </div>

          {/* Phone mockup placeholder */}
          <div className="relative mx-auto w-64 h-[500px]">
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-b from-violet-500/20 to-cyan-500/10 border border-white/10 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center space-y-3 px-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 mx-auto flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-white/40 text-xs">Screenshot coming soon</p>
              </div>
            </div>
            {/* Glow under phone */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-40 h-8 bg-violet-500/30 blur-2xl rounded-full" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-4">
              Features
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Everything you need to save more
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/10 border border-white/5 flex items-center justify-center text-xl mb-4">
                  {f.icon}
                </div>
                <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Businesses */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 text-xs font-medium mb-6">
                For Businesses
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-6">
                Reach new customers{" "}
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                  in your area
                </span>
              </h2>
              <p className="text-white/50 leading-relaxed mb-8">
                Post a deal in minutes, track engagement, and grow your local customer base —
                no marketing budget needed. Scout puts your business in front of people nearby
                who are actively looking for deals.
              </p>
              <ul className="space-y-3">
                {bizFeatures.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-white/70 text-sm">
                    <div className="w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {bizStats.map((s) => (
                <div key={s.label} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                    {s.value}
                  </div>
                  <div className="text-white/40 text-xs">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-violet-600/20 via-fuchsia-500/10 to-cyan-500/20 border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-violet-600/20 blur-[80px]" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
                Start finding deals today
              </h2>
              <p className="text-white/50 mb-8">
                Download Scout and discover what&apos;s on offer around you right now.
              </p>
              <a
                href="#download"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-xl shadow-violet-900/30"
              >
                Download Scout
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-white/25 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-violet-500 to-cyan-400" />
            <span>&copy; {new Date().getFullYear()} CodeVolve Pty Ltd. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors">Terms of Service</Link>
            <Link href="/delete-account" className="hover:text-white/60 transition-colors">Delete Account</Link>
            <Link href="https://codevolve.com.au" className="hover:text-white/60 transition-colors">CodeVolve</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: "📍",
    title: "Location-smart browsing",
    description: "Scout surfaces deals closest to you automatically. Search any suburb to see what's on nearby.",
  },
  {
    icon: "❤️",
    title: "Save your favourites",
    description: "Watchlist deals you love and get notified before they expire. Never miss a limited-time offer.",
  },
  {
    icon: "🔔",
    title: "Real-time notifications",
    description: "Get instant alerts when new deals drop from your favourite businesses.",
  },
  {
    icon: "🏷️",
    title: "Every category covered",
    description: "Food & Drink, Retail, Beauty, Fitness, Entertainment and more — all in one place.",
  },
  {
    icon: "⚡",
    title: "Flash deals",
    description: "Exclusive time-limited offers you won't find anywhere else. Act fast.",
  },
  {
    icon: "🔍",
    title: "Smart search",
    description: "Find exactly what you're looking for with filters by category, distance, and discount size.",
  },
];

const bizFeatures = [
  "Post a deal in under 2 minutes",
  "Reach customers actively looking for deals",
  "AI-powered deal descriptions",
  "Track views and engagement",
  "Manage multiple deals easily",
];

const bizStats = [
  { value: "Free", label: "to get started" },
  { value: "2 min", label: "to post a deal" },
  { value: "Local", label: "targeted reach" },
  { value: "AI", label: "powered descriptions" },
];
