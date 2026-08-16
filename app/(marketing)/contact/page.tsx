import type { Metadata } from "next";
import SectionHeading from "@/components/marketing/SectionHeading";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the CodeVolve team.",
};

export default function ContactPage() {
  return (
    <div className="px-6 py-20">
      <div className="mx-auto max-w-xl">
        <SectionHeading
          eyebrow="Contact"
          title="Talk to us"
          description="Questions about a track, a school partnership, or anything else — send us a message."
          align="left"
        />
        <div className="mt-12">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
