import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Delete Account — Scout by CodeVolve",
  description:
    "Request deletion of your Scout account and associated data. Learn what data is deleted and how to submit a deletion request.",
};

export default function DeleteAccount() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f0f0f5]">
      {/* Header */}
      <header className="border-b border-white/5 px-6 py-5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="https://codevolve.com.au" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">
              CV
            </div>
            <span className="font-semibold text-white text-lg tracking-tight">CodeVolve</span>
          </Link>
          <span className="text-sm text-white/30 font-medium tracking-wide uppercase">Scout</span>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Title */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium mb-6">
            Account
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Delete Your Account
          </h1>
          <p className="text-white/50 text-sm">
            Last updated: 3 April 2026
          </p>
        </div>

        <div className="space-y-10 text-[15px] leading-7 text-white/70">

          {/* Intro */}
          <section>
            <p>
              You have the right to delete your <strong className="text-white">Scout</strong> account
              and all associated personal data at any time. This page explains how to do that — either
              directly in the app or by contacting us.
            </p>
          </section>

          <Divider />

          {/* Option 1 — In-app */}
          <section>
            <SectionTitle number="1" title="Delete from the app (recommended)" />
            <p>The fastest way to delete your account is directly inside Scout:</p>
            <ol className="list-decimal pl-6 space-y-2 mt-4">
              <li>Open the <strong className="text-white">Scout</strong> app</li>
              <li>Go to <strong className="text-white">Profile</strong> (bottom right tab)</li>
              <li>Tap <strong className="text-white">Settings</strong></li>
              <li>Tap <strong className="text-white">Delete Account</strong></li>
              <li>Confirm the deletion when prompted</li>
            </ol>
            <p className="mt-4">
              Your account and all associated data will be permanently deleted immediately.
            </p>
          </section>

          <Divider />

          {/* Option 2 — Email */}
          <section>
            <SectionTitle number="2" title="Request deletion by email" />
            <p>
              If you no longer have access to the app, you can request deletion by emailing us:
            </p>
            <div className="mt-4 p-6 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2 text-sm">
              <p>
                Email:{" "}
                <a
                  href="mailto:support@codevolve.com.au?subject=Delete My Scout Account"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  support@codevolve.com.au
                </a>
              </p>
              <p className="text-white/40 text-xs mt-2">
                Subject: <span className="text-white/60">Delete My Scout Account</span>
              </p>
              <p className="text-white/40 text-xs">
                Include the email address associated with your Scout account.
              </p>
            </div>
            <p className="mt-4">
              We will process your request and confirm deletion within{" "}
              <strong className="text-white">7 business days</strong>.
            </p>
          </section>

          <Divider />

          {/* What gets deleted */}
          <section>
            <SectionTitle number="3" title="What data is deleted" />
            <p>When your account is deleted, we permanently remove:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Your profile information (name, email, location preferences)</li>
              <li>Your watchlist and saved deals</li>
              <li>Your notification history</li>
              <li>Any deals or offers you posted (for business accounts)</li>
              <li>Your business profile and associated images (for business accounts)</li>
              <li>All authentication credentials</li>
            </ul>
          </section>

          <Divider />

          {/* What is retained */}
          <section>
            <SectionTitle number="4" title="What data may be retained" />
            <p>
              Some data may be retained for a limited period where required by law or for legitimate
              business purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <strong className="text-white">Transaction records</strong> — retained for 7 years
                as required under Australian tax law
              </li>
              <li>
                <strong className="text-white">Anonymised analytics</strong> — aggregate, non-identifiable
                usage data that cannot be linked back to you
              </li>
              <li>
                <strong className="text-white">Legal hold data</strong> — if required by a court order
                or regulatory authority
              </li>
            </ul>
          </section>

          <Divider />

          {/* Contact */}
          <section>
            <SectionTitle number="5" title="Questions" />
            <p>
              For any privacy-related questions or concerns, contact us at:
            </p>
            <div className="mt-4 p-6 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2 text-sm">
              <p><strong className="text-white">CodeVolve Pty Ltd</strong></p>
              <p>Australia</p>
              <p>
                Email:{" "}
                <a href="mailto:support@codevolve.com.au" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  support@codevolve.com.au
                </a>
              </p>
              <p>
                Website:{" "}
                <a href="https://codevolve.com.au" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  codevolve.com.au
                </a>
              </p>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-8 mt-10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-white/25 text-sm">
          <span>&copy; {new Date().getFullYear()} CodeVolve Pty Ltd. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link href="https://codevolve.com.au" className="hover:text-white/60 transition-colors">
              codevolve.com.au
            </Link>
            <Link href="https://scout.codevolve.com.au/privacy" className="hover:text-white/60 transition-colors">
              Privacy Policy
            </Link>
            <Link href="https://scout.codevolve.com.au/terms" className="hover:text-white/60 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Divider() {
  return <hr className="border-white/5" />;
}

function SectionTitle({ number, title }: { number: string; title: string }) {
  return (
    <h2 className="text-xl font-semibold text-white mb-4">
      <span className="text-red-400 mr-2">{number}.</span>
      {title}
    </h2>
  );
}
