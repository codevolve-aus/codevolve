import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for the CodeVolve IT training platform.",
};

export default function TermsOfService() {
  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 rounded-lg border border-primary/30 bg-primary/10 p-4 text-sm text-foreground/80">
          <strong className="text-foreground">Template — not yet legally reviewed.</strong> Have
          this reviewed by a qualified lawyer before real enrollments or payments go through
          CodeVolve.
        </div>

        <h1 className="text-4xl font-semibold tracking-tight text-foreground">Terms of Service</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Last updated: 16 August 2026 · Effective: 16 August 2026
        </p>

        <div className="mt-10 flex flex-col gap-10 text-[15px] leading-7 text-muted-foreground">
          <section>
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the CodeVolve
              IT training platform, operated by{" "}
              <strong className="text-foreground">CodeVolve Pty Ltd</strong> (&ldquo;CodeVolve&rdquo;),
              incorporated in Australia.
            </p>
            <p className="mt-4">
              If you are under 18, a parent or guardian (or your enrolling school/college) must
              agree to these Terms on your behalf before you use the Service.
            </p>
          </section>

          <Divider />

          <Section title="1. The Service">
            <p>
              CodeVolve provides IT training tracks, mentor-led review, and progress tracking for
              school students and college grads. We may add, change, or retire tracks and features
              over time.
            </p>
          </Section>

          <Divider />

          <Section title="2. Accounts">
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>You must provide accurate information when creating an account.</li>
              <li>You’re responsible for activity under your account and for keeping your credentials secure.</li>
              <li>Accounts are personal and may not be shared or transferred.</li>
            </ul>
          </Section>

          <Divider />

          <Section title="3. Acceptable Use">
            <p>You agree not to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Submit plagiarized project work as your own.</li>
              <li>Harass, abuse, or harm mentors or other students.</li>
              <li>Attempt to gain unauthorised access to any part of the Service.</li>
              <li>Use the Service to build or distribute malicious code outside of designated learning exercises.</li>
              <li>Violate any applicable law.</li>
            </ul>
            <p className="mt-4">
              Violations may result in suspension or termination of your account.
            </p>
          </Section>

          <Divider />

          <Section title="4. Content You Submit">
            <p>
              You retain ownership of code and projects you submit. You grant CodeVolve a
              non-exclusive, royalty-free licence to use, display, and store your submissions
              solely to operate the Service, provide mentor feedback, and (with your consent)
              feature your work as an example for future students.
            </p>
          </Section>

          <Divider />

          <Section title="5. Payment & Cancellation">
            <p>
              Paid plans are billed as described at checkout. You may cancel a subscription at any
              time via account settings; access continues until the end of the current billing
              period. School partnership billing terms are set out in the applicable partnership
              agreement.
            </p>
          </Section>

          <Divider />

          <Section title="6. Disclaimers & Liability">
            <p>
              The Service is provided &ldquo;as is.&rdquo; We don’t guarantee specific employment,
              academic, or interview outcomes from completing a track. To the extent permitted by
              law, CodeVolve’s liability is limited to the amount you paid in the 12 months before
              a claim. Nothing here excludes rights that can’t be excluded under the{" "}
              <em>Australian Consumer Law</em>.
            </p>
          </Section>

          <Divider />

          <Section title="7. Changes & Governing Law">
            <p>
              We may update these Terms with reasonable notice. These Terms are governed by the
              laws of New South Wales, Australia.
            </p>
          </Section>

          <Divider />

          <Section title="8. Contact Us">
            <div className="mt-4 space-y-1 rounded-xl border border-border bg-card/60 p-6 text-sm">
              <p><strong className="text-foreground">CodeVolve Pty Ltd</strong> · Australia</p>
              <p>
                Email:{" "}
                <a href="mailto:legal@codevolve.com.au" className="text-primary hover:underline">
                  legal@codevolve.com.au
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
