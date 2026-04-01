import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — Scout by Codevolve",
  description:
    "Terms of Service for Scout, an AI-powered deals discovery platform by Codevolve Pty Ltd. Understand your rights and responsibilities when using Scout.",
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f0f0f5]">
      {/* Header */}
      <header className="border-b border-white/5 px-6 py-5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="https://codevolve.com.au" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm">
              CV
            </div>
            <span className="font-semibold text-white text-lg tracking-tight">Codevolve</span>
          </Link>
          <span className="text-sm text-white/30 font-medium tracking-wide uppercase">Scout</span>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Title */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-6">
            Legal
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-white/50 text-sm">
            Last updated: 1 April 2026 &nbsp;·&nbsp; Effective: 1 April 2026
          </p>
        </div>

        <div className="prose prose-invert max-w-none space-y-10 text-[15px] leading-7 text-white/70">

          {/* Intro */}
          <section>
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of{" "}
              <strong className="text-white">Scout</strong>, an AI-powered deals and commerce platform
              operated by <strong className="text-white">Codevolve Pty Ltd</strong> (&ldquo;Codevolve&rdquo;,
              &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), incorporated in Australia.
            </p>
            <p className="mt-4">
              By creating an account or using Scout, you confirm that you are at least 18 years old (or have
              parental consent if aged 13–17), that you have read and understood these Terms, and that you
              agree to be bound by them. If you do not agree, do not use the Service.
            </p>
            <p className="mt-4">
              These Terms are a legally binding agreement between you and Codevolve Pty Ltd, governed by the
              laws of New South Wales, Australia.
            </p>
          </section>

          <Divider />

          {/* 1 */}
          <section>
            <SectionTitle number="1" title="The Service" />
            <p>
              Scout is a mobile application and platform that connects consumers with businesses to discover,
              share, and redeem deals and offers. The Service includes AI-powered personalisation, business
              listings, deal management tools, and associated features.
            </p>
            <p className="mt-4">
              We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time
              with reasonable notice where practicable.
            </p>
          </section>

          <Divider />

          {/* 2 */}
          <section>
            <SectionTitle number="2" title="Account Registration" />
            <p>To use most features of Scout, you must create an account. You agree to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Provide accurate, current, and complete information during registration.</li>
              <li>Maintain and promptly update your account information.</li>
              <li>Keep your password secure and confidential.</li>
              <li>Notify us immediately at{" "}
                <a href="mailto:support@codevolve.com.au" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  support@codevolve.com.au
                </a>{" "}
                if you suspect unauthorised access to your account.
              </li>
              <li>Accept responsibility for all activity that occurs under your account.</li>
            </ul>
            <p className="mt-4">
              You may not create more than one personal account. Business accounts must be registered by an
              authorised representative of the business and require a valid Australian Business Number (ABN).
            </p>
          </section>

          <Divider />

          {/* 3 */}
          <section>
            <SectionTitle number="3" title="User Conduct" />
            <p>You agree not to use Scout to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Post false, misleading, fraudulent, or deceptive deals or content.</li>
              <li>Violate any applicable Australian or international law or regulation.</li>
              <li>Harass, threaten, abuse, or harm other users or third parties.</li>
              <li>Post or transmit spam, unsolicited messages, or pyramid schemes.</li>
              <li>Scrape, crawl, or otherwise extract data from the Service without our written consent.</li>
              <li>Attempt to gain unauthorised access to any part of the Service or another user&rsquo;s account.</li>
              <li>Upload malware, viruses, or any malicious code.</li>
              <li>Impersonate any person or entity or misrepresent your affiliation with a business.</li>
              <li>Infringe any intellectual property rights of Codevolve or third parties.</li>
              <li>Use the Service in any way that could damage, disable, or impair it.</li>
            </ul>
            <p className="mt-4">
              Violation of these rules may result in immediate suspension or termination of your account
              without notice, and may be referred to relevant Australian authorities.
            </p>
          </section>

          <Divider />

          {/* 4 */}
          <section>
            <SectionTitle number="4" title="Business Accounts and Listings" />
            <p>
              Businesses registering on Scout must hold a valid Australian Business Number (ABN) which will
              be verified through the ABR. By registering as a business, you represent and warrant that:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>You are authorised to act on behalf of the business.</li>
              <li>All deal and offer information you post is accurate, lawful, and not misleading.</li>
              <li>Your deals comply with the <em>Australian Consumer Law</em> (Schedule 2 of the <em>Competition and Consumer Act 2010</em> (Cth)).</li>
              <li>You will honour all deals and offers posted on your business profile.</li>
              <li>You will promptly remove expired, unavailable, or erroneous deals.</li>
            </ul>
            <p className="mt-4">
              Codevolve is not a party to any transaction between users and businesses. We are a platform
              intermediary and accept no liability for the quality, safety, legality, or availability of
              any deal or product listed on the Service.
            </p>
          </section>

          <Divider />

          {/* 5 */}
          <section>
            <SectionTitle number="5" title="User Content" />
            <p>
              You retain ownership of content you post on Scout (&ldquo;User Content&rdquo;). By posting User Content,
              you grant Codevolve a non-exclusive, royalty-free, worldwide, sublicensable licence to use,
              reproduce, modify, distribute, display, and create derivative works from your User Content
              solely to operate and improve the Service.
            </p>
            <p className="mt-4">You represent and warrant that your User Content:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Does not infringe any third-party intellectual property, privacy, or other rights.</li>
              <li>Is accurate and not misleading.</li>
              <li>Complies with all applicable laws.</li>
            </ul>
            <p className="mt-4">
              We reserve the right to remove any User Content that violates these Terms or our community
              guidelines, without notice.
            </p>
          </section>

          <Divider />

          {/* 6 */}
          <section>
            <SectionTitle number="6" title="Intellectual Property" />
            <p>
              The Scout app, its design, logo, AI features, source code, and all content produced by
              Codevolve (excluding User Content) are owned by or licensed to Codevolve Pty Ltd and are
              protected by Australian and international intellectual property laws.
            </p>
            <p className="mt-4">
              You are granted a limited, non-exclusive, non-transferable, revocable licence to use the
              Service for personal, non-commercial purposes. You must not copy, modify, reverse-engineer,
              decompile, or distribute any part of the Service without our prior written consent.
            </p>
          </section>

          <Divider />

          {/* 7 */}
          <section>
            <SectionTitle number="7" title="Privacy" />
            <p>
              Your use of Scout is also governed by our{" "}
              <Link href="https://scout.codevolve.com.au/privacy" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Privacy Policy
              </Link>
              , which is incorporated into these Terms by reference. By using the Service, you consent to
              the collection and use of your information as described in the Privacy Policy.
            </p>
          </section>

          <Divider />

          {/* 8 */}
          <section>
            <SectionTitle number="8" title="Disclaimers" />
            <p>
              To the maximum extent permitted by Australian law, Scout is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
              without warranties of any kind, either express or implied.
            </p>
            <p className="mt-4">We do not warrant that:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>The Service will be uninterrupted, error-free, or secure at all times.</li>
              <li>AI-generated recommendations will be accurate or suit your particular needs.</li>
              <li>Any deals, offers, or prices listed by businesses are accurate or available.</li>
            </ul>
            <p className="mt-4">
              Nothing in these Terms excludes any guarantee, warranty, or right that cannot be excluded
              under the <em>Australian Consumer Law</em>.
            </p>
          </section>

          <Divider />

          {/* 9 */}
          <section>
            <SectionTitle number="9" title="Limitation of Liability" />
            <p>
              To the extent permitted by law, Codevolve&rsquo;s total liability to you for any loss or damage
              arising out of or in connection with the Service (whether in contract, tort, statute, or
              otherwise) is limited to the greater of AUD $100 or the amount you paid to Codevolve in the
              12 months preceding the claim.
            </p>
            <p className="mt-4">
              We are not liable for any indirect, incidental, special, consequential, or punitive damages,
              including lost profits, data loss, or business interruption, even if we have been advised of
              the possibility of such damages.
            </p>
            <p className="mt-4">
              These limitations do not apply to liability that cannot be limited under the <em>Australian
              Consumer Law</em> or other applicable legislation.
            </p>
          </section>

          <Divider />

          {/* 10 */}
          <section>
            <SectionTitle number="10" title="Termination" />
            <p>
              You may delete your account at any time through the app settings. Codevolve may suspend or
              terminate your access to the Service at any time, with or without cause, with reasonable
              notice where practicable.
            </p>
            <p className="mt-4">
              Upon termination, your right to use the Service ceases immediately. Sections of these Terms
              that by their nature should survive termination (including intellectual property, disclaimers,
              limitation of liability, and governing law) will continue to apply.
            </p>
          </section>

          <Divider />

          {/* 11 */}
          <section>
            <SectionTitle number="11" title="Changes to These Terms" />
            <p>
              We may update these Terms from time to time. We will notify you of material changes via
              in-app notification or email at least 14 days before they take effect. Your continued use
              of the Service after the effective date constitutes acceptance of the revised Terms.
            </p>
          </section>

          <Divider />

          {/* 12 */}
          <section>
            <SectionTitle number="12" title="Governing Law and Disputes" />
            <p>
              These Terms are governed by the laws of New South Wales, Australia. Any disputes arising
              under these Terms will be subject to the exclusive jurisdiction of the courts of New South
              Wales, Australia.
            </p>
            <p className="mt-4">
              We encourage you to contact us first to resolve any dispute informally. If a dispute cannot
              be resolved informally within 30 days, either party may pursue formal legal proceedings.
            </p>
          </section>

          <Divider />

          {/* 13 */}
          <section>
            <SectionTitle number="13" title="Contact Us" />
            <p>For questions about these Terms:</p>
            <div className="mt-4 p-6 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2 text-sm">
              <p><strong className="text-white">Codevolve Pty Ltd</strong></p>
              <p>Australia</p>
              <p>
                Email:{" "}
                <a href="mailto:legal@codevolve.com.au" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  legal@codevolve.com.au
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
          <span>&copy; {new Date().getFullYear()} Codevolve Pty Ltd. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link href="https://codevolve.com.au" className="hover:text-white/60 transition-colors">
              codevolve.com.au
            </Link>
            <Link href="https://scout.codevolve.com.au/privacy" className="hover:text-white/60 transition-colors">
              Privacy Policy
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
      <span className="text-cyan-400 mr-2">{number}.</span>
      {title}
    </h2>
  );
}
