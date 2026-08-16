import type { Metadata } from "next";
import SectionHeading from "@/components/marketing/SectionHeading";
import Testimonials from "@/components/marketing/Testimonials";

export const metadata: Metadata = {
  title: "Success Stories",
  description: "Student outcomes from the CodeVolve evolution path.",
};

export default function SuccessStoriesPage() {
  return (
    <div className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Success stories"
          title="From first commit to industry-ready"
          description="A few stories illustrative of the outcome CodeVolve is designed around — swapped for real alumni stories as cohorts graduate."
          align="left"
        />
        <div className="mt-14">
          <Testimonials />
        </div>
      </div>
    </div>
  );
}
