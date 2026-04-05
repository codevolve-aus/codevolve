import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Scout by CodeVolve",
  description:
    "Privacy Policy for Scout, an AI-powered deals discovery platform by CodeVolve Pty Ltd. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicy() {
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-6">
            Legal
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-white/50 text-sm">
            Last updated: 1 April 2026 &nbsp;·&nbsp; Effective: 1 April 2026
          </p>
        </div>

        <div className="prose prose-invert max-w-none space-y-10 text-[15px] leading-7 text-white/70">

          {/* Intro */}
          <section>
            <p>
              This Privacy Policy describes how <strong className="text-white">CodeVolve Pty Ltd</strong> (ABN to be confirmed)
              (&ldquo;CodeVolve&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), operating from Australia, collects,
              uses, discloses, and safeguards your personal information when you use{" "}
              <strong className="text-white">Scout</strong> — our AI-powered deals and commerce platform
              (the &ldquo;App&rdquo; or &ldquo;Service&rdquo;).
            </p>
            <p className="mt-4">
              By downloading, installing, or using Scout, you agree to the practices described in this policy.
              If you do not agree, please do not use the Service.
            </p>
            <p className="mt-4">
              This policy is governed by and compliant with the{" "}
              <em>Privacy Act 1988</em> (Cth) and the Australian Privacy Principles (APPs).
            </p>
          </section>

          <Divider />

          {/* 1 */}
          <section>
            <SectionTitle number="1" title="Information We Collect" />
            <SubTitle>1.1 Information You Provide Directly</SubTitle>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong className="text-white">Account information:</strong> name, email address, and password when you register.</li>
              <li><strong className="text-white">Profile information:</strong> profile photo, display name, and any optional details you choose to add.</li>
              <li><strong className="text-white">Business information:</strong> if you register as a business, your ABN, business name, address, and contact details.</li>
              <li><strong className="text-white">User-generated content:</strong> deals, offers, listings, reviews, messages, and other content you submit.</li>
              <li><strong className="text-white">Support communications:</strong> messages you send to our support team.</li>
            </ul>

            <SubTitle className="mt-6">1.2 Information Collected Automatically</SubTitle>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong className="text-white">Device information:</strong> device type, operating system version, unique device identifiers, and mobile network information.</li>
              <li><strong className="text-white">Usage data:</strong> features accessed, pages viewed, time spent, tap/click interactions, search queries, and error logs.</li>
              <li><strong className="text-white">Location data:</strong> approximate location (derived from IP address) and, with your explicit permission, precise GPS location to show nearby deals.</li>
              <li><strong className="text-white">Technical data:</strong> IP address, browser type (if web), app version, crash reports, and diagnostic data.</li>
            </ul>

            <SubTitle className="mt-6">1.3 Information from Third Parties</SubTitle>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong className="text-white">Authentication providers:</strong> if you sign in with Google or Apple, we receive your name and email from those services.</li>
              <li><strong className="text-white">ABN validation:</strong> we verify Australian Business Numbers through the ABR (Australian Business Register) API.</li>
              <li><strong className="text-white">Analytics partners:</strong> aggregated, de-identified analytics data to understand app usage.</li>
            </ul>
          </section>

          <Divider />

          {/* 2 */}
          <section>
            <SectionTitle number="2" title="How We Use Your Information" />
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Create and manage your account and authenticate your identity.</li>
              <li>Provide, personalise, and improve the Scout Service, including AI-powered deal recommendations.</li>
              <li>Verify business registrations via ABN lookup.</li>
              <li>Show you deals and offers relevant to your location and preferences.</li>
              <li>Process and facilitate transactions within the App.</li>
              <li>Send service-related notifications (e.g., deal alerts, account activity, security alerts).</li>
              <li>Send promotional communications — only with your consent, and you may opt out at any time.</li>
              <li>Detect, investigate, and prevent fraudulent or prohibited activity and enforce our Terms of Service.</li>
              <li>Comply with legal obligations under Australian law.</li>
              <li>Conduct analytics, research, and product development to improve our services.</li>
            </ul>
          </section>

          <Divider />

          {/* 3 */}
          <section>
            <SectionTitle number="3" title="Sharing Your Information" />
            <p>We do not sell your personal information. We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>
                <strong className="text-white">Service providers:</strong> trusted third-party vendors who assist us in operating the Service
                (e.g., Supabase for database and authentication, Firebase for push notifications, cloud infrastructure providers).
                These parties process data only on our behalf under data processing agreements.
              </li>
              <li>
                <strong className="text-white">Other users:</strong> your public profile, posted deals, and reviews are visible to other users of Scout.
              </li>
              <li>
                <strong className="text-white">Business verification:</strong> ABN data is validated against the publicly available ABR dataset.
              </li>
              <li>
                <strong className="text-white">Legal authorities:</strong> when required by law, court order, or to protect the rights and safety of CodeVolve, our users, or the public.
              </li>
              <li>
                <strong className="text-white">Business transfers:</strong> in the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you via email or prominent in-app notice.
              </li>
            </ul>
          </section>

          <Divider />

          {/* 4 */}
          <section>
            <SectionTitle number="4" title="Data Storage and Security" />
            <p>
              Your data is stored on servers provided by Supabase and may be located in Australia or other countries.
              We implement industry-standard security measures including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Encryption of data in transit (TLS/HTTPS) and at rest (AES-256).</li>
              <li>Row-level security policies enforced at the database level.</li>
              <li>Access controls limiting data access to authorised personnel only.</li>
              <li>Regular security reviews and vulnerability assessments.</li>
            </ul>
            <p className="mt-4">
              No method of transmission or storage is 100% secure. If you believe your account has been compromised,
              contact us immediately at{" "}
              <a href="mailto:support@codevolve.com.au" className="text-violet-400 hover:text-violet-300 transition-colors">
                support@codevolve.com.au
              </a>.
            </p>
          </section>

          <Divider />

          {/* 5 */}
          <section>
            <SectionTitle number="5" title="Data Retention" />
            <p>
              We retain your personal information for as long as your account is active or as needed to provide the Service.
              If you delete your account:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Your profile and personal data are deleted or anonymised within 30 days.</li>
              <li>We may retain certain data for up to 7 years where required by Australian law (e.g., financial records).</li>
              <li>Anonymised, aggregated data may be retained indefinitely for analytics.</li>
            </ul>
          </section>

          <Divider />

          {/* 6 */}
          <section>
            <SectionTitle number="6" title="Your Rights and Choices" />
            <p>Under the Australian Privacy Principles, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong className="text-white">Access:</strong> request a copy of the personal information we hold about you.</li>
              <li><strong className="text-white">Correction:</strong> request correction of inaccurate or incomplete information.</li>
              <li><strong className="text-white">Deletion:</strong> request deletion of your account and personal data, subject to legal retention obligations.</li>
              <li><strong className="text-white">Opt-out:</strong> unsubscribe from promotional emails at any time via the unsubscribe link or in-app settings.</li>
              <li><strong className="text-white">Location:</strong> revoke location permissions at any time via your device settings.</li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, contact us at{" "}
              <a href="mailto:privacy@codevolve.com.au" className="text-violet-400 hover:text-violet-300 transition-colors">
                privacy@codevolve.com.au
              </a>.
              We will respond within 30 days.
            </p>
          </section>

          <Divider />

          {/* 7 */}
          <section>
            <SectionTitle number="7" title="Children's Privacy" />
            <p>
              Scout is not directed at children under the age of 13. We do not knowingly collect personal information
              from children under 13. If we become aware that we have collected such information, we will delete it promptly.
              If you believe a child has provided us with personal information, please contact us immediately.
            </p>
          </section>

          <Divider />

          {/* 8 */}
          <section>
            <SectionTitle number="8" title="Third-Party Links and Services" />
            <p>
              Scout may contain links to third-party websites or services. This Privacy Policy does not apply to those
              third parties, and we are not responsible for their privacy practices. We encourage you to review the
              privacy policies of any third-party services you access.
            </p>
          </section>

          <Divider />

          {/* 9 */}
          <section>
            <SectionTitle number="9" title="Changes to This Policy" />
            <p>
              We may update this Privacy Policy from time to time. When we make material changes, we will notify you
              via in-app notification or email at least 14 days before the changes take effect. Continued use of
              Scout after the effective date constitutes acceptance of the updated policy.
            </p>
          </section>

          <Divider />

          {/* 10 */}
          <section>
            <SectionTitle number="10" title="Contact Us" />
            <p>For privacy-related questions, complaints, or requests:</p>
            <div className="mt-4 p-6 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2 text-sm">
              <p><strong className="text-white">CodeVolve Pty Ltd</strong></p>
              <p>Australia</p>
              <p>
                Email:{" "}
                <a href="mailto:privacy@codevolve.com.au" className="text-violet-400 hover:text-violet-300 transition-colors">
                  privacy@codevolve.com.au
                </a>
              </p>
              <p>
                Website:{" "}
                <a href="https://codevolve.com.au" className="text-violet-400 hover:text-violet-300 transition-colors">
                  codevolve.com.au
                </a>
              </p>
            </div>
            <p className="mt-4">
              If you are unsatisfied with our response, you may lodge a complaint with the{" "}
              <a
                href="https://www.oaic.gov.au"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 hover:text-violet-300 transition-colors"
              >
                Office of the Australian Information Commissioner (OAIC)
              </a>.
            </p>
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
      <span className="text-violet-400 mr-2">{number}.</span>
      {title}
    </h2>
  );
}

function SubTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={`text-base font-semibold text-white/90 mt-4 ${className ?? ""}`}>
      {children}
    </h3>
  );
}
