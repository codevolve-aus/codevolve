import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delete Account",
  description: "Request deletion of your CodeVolve account and associated data.",
};

export default function DeleteAccount() {
  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">Delete Your Account</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: 16 August 2026</p>

        <div className="mt-10 flex flex-col gap-10 text-[15px] leading-7 text-muted-foreground">
          <section>
            <p>
              You (or, for students under 18, your parent/guardian) can delete your CodeVolve
              account and associated personal data at any time.
            </p>
          </section>

          <Divider />

          <Section title="1. Delete from your dashboard (recommended)">
            <ol className="mt-3 list-decimal space-y-2 pl-6">
              <li>Sign in and open your <strong className="text-foreground">Dashboard</strong></li>
              <li>Go to <strong className="text-foreground">Settings</strong></li>
              <li>Choose <strong className="text-foreground">Delete account</strong> and confirm</li>
            </ol>
          </Section>

          <Divider />

          <Section title="2. Request deletion by email">
            <p>If you can’t access your account, email us directly:</p>
            <div className="mt-4 space-y-1 rounded-xl border border-border bg-card/60 p-6 text-sm">
              <p>
                Email:{" "}
                <a
                  href="mailto:support@codevolve.com.au?subject=Delete My CodeVolve Account"
                  className="text-primary hover:underline"
                >
                  support@codevolve.com.au
                </a>
              </p>
              <p className="text-xs text-muted-foreground">
                Subject: Delete My CodeVolve Account — include the email on your account.
              </p>
            </div>
            <p className="mt-4">We’ll confirm deletion within 7 business days.</p>
          </Section>

          <Divider />

          <Section title="3. What gets deleted">
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Your profile and account credentials</li>
              <li>Your enrollment and lesson progress history</li>
              <li>Project submissions tied to your account</li>
            </ul>
          </Section>

          <Divider />

          <Section title="4. What may be retained">
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Records required for tax/financial law (retained per statutory requirements)</li>
              <li>Anonymised, aggregate analytics that can’t be linked back to you</li>
            </ul>
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
