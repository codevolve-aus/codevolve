import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for CodeVolve, an IT training platform for school students and college grads.",
};

export default function PrivacyPolicy() {
  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 rounded-lg border border-primary/30 bg-primary/10 p-4 text-sm text-foreground/80">
          <strong className="text-foreground">Template — not yet legally reviewed.</strong>{" "}
          CodeVolve serves students under 18. This draft must be reviewed by a qualified privacy
          lawyer, with particular attention to the Australian Privacy Principles’ handling of
          minors’ data, before this platform processes real student accounts.
        </div>

        <h1 className="text-4xl font-semibold tracking-tight text-foreground">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Last updated: 16 August 2026 · Effective: 16 August 2026
        </p>

        <div className="mt-10 flex flex-col gap-10 text-[15px] leading-7 text-muted-foreground">
          <section>
            <p>
              This Privacy Policy describes how <strong className="text-foreground">CodeVolve Pty Ltd</strong>{" "}
              (&ldquo;CodeVolve&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), operating from
              Australia, collects, uses, discloses, and safeguards personal information when you
              use the CodeVolve IT training platform (the &ldquo;Service&rdquo;).
            </p>
            <p className="mt-4">
              CodeVolve is designed for school students and college students, many of whom are
              under 18. Where a student is under the age required to consent to data collection
              under the <em>Privacy Act 1988</em> (Cth), we require parent or guardian consent
              before account creation, and schools enrolling students through a partnership
              agreement are responsible for obtaining the consents required by that agreement.
            </p>
          </section>

          <Divider />

          <Section title="1. Information We Collect">
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li><strong className="text-foreground">Account information:</strong> name, email address, and authentication details, managed via our identity provider (Clerk).</li>
              <li><strong className="text-foreground">Learning data:</strong> tracks you enroll in, lessons completed, XP earned, and evolution stage.</li>
              <li><strong className="text-foreground">Project submissions:</strong> code, portfolio links, and mentor feedback you choose to submit.</li>
              <li><strong className="text-foreground">School/college affiliation:</strong> where enrolled through a school partnership, your school name and cohort.</li>
              <li><strong className="text-foreground">Technical data:</strong> device, browser, and usage data collected automatically to operate and improve the Service.</li>
            </ul>
          </Section>

          <Divider />

          <Section title="2. How We Use Your Information">
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Create and secure your account, and authenticate you on each visit.</li>
              <li>Track and display your learning progress and evolution stage.</li>
              <li>Connect you with mentors and enable code/project review.</li>
              <li>Share progress summaries with a partner school’s coordinators, where applicable.</li>
              <li>Improve the curriculum and platform based on aggregate usage.</li>
              <li>Communicate service updates and, with consent, program news.</li>
            </ul>
          </Section>

          <Divider />

          <Section title="3. Sharing Your Information">
            <p>We do not sell personal information. We share it only with:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li><strong className="text-foreground">Service providers:</strong> our identity provider and database provider, who process data solely on our behalf.</li>
              <li><strong className="text-foreground">Mentors:</strong> assigned mentors can see your progress and project submissions within your track.</li>
              <li><strong className="text-foreground">Partner schools:</strong> progress summaries, where you were enrolled through a school partnership.</li>
              <li><strong className="text-foreground">Legal authorities:</strong> where required by law.</li>
            </ul>
          </Section>

          <Divider />

          <Section title="4. Data Retention & Security">
            <p>
              We retain account and progress data while your account is active. If you delete your
              account, personal data is deleted or de-identified within 30 days, other than
              records we’re required to retain by law. Data is encrypted in transit and at rest,
              with access restricted to authorised personnel.
            </p>
          </Section>

          <Divider />

          <Section title="5. Your Rights">
            <p>
              You (or, for students under 18, your parent/guardian) may request access to,
              correction of, or deletion of personal information at any time — see our{" "}
              <a href="/delete-account" className="text-primary hover:underline">
                account deletion page
              </a>
              . Contact{" "}
              <a href="mailto:privacy@codevolve.com.au" className="text-primary hover:underline">
                privacy@codevolve.com.au
              </a>{" "}
              for any privacy request. We aim to respond within 30 days.
            </p>
          </Section>

          <Divider />

          <Section title="6. Changes to This Policy">
            <p>
              We’ll notify you of material changes via email or in-platform notice at least 14
              days before they take effect.
            </p>
          </Section>

          <Divider />

          <Section title="7. Contact Us">
            <div className="mt-4 space-y-1 rounded-xl border border-border bg-card/60 p-6 text-sm">
              <p><strong className="text-foreground">CodeVolve Pty Ltd</strong> · Australia</p>
              <p>
                Email:{" "}
                <a href="mailto:privacy@codevolve.com.au" className="text-primary hover:underline">
                  privacy@codevolve.com.au
                </a>
              </p>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Divider() {
  return <hr className="border-border" />;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 text-xl font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  );
}
