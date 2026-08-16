import type { Metadata } from "next";
import SectionHeading from "@/components/marketing/SectionHeading";
import MentorsGrid from "@/components/marketing/MentorsGrid";
import { getMentors } from "@/lib/content";

export const metadata: Metadata = {
  title: "Mentors",
  description:
    "Meet the industry engineers who mentor CodeVolve students — real practitioners, not pre-recorded video.",
};

export default async function MentorsPage() {
  const mentors = await getMentors();

  return (
    <div className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Mentors"
          title="Learn from people actually shipping software"
          description="Every CodeVolve track is guided by a practicing industry engineer — someone who reviews your code, unblocks you when you're stuck, and preps you for real interviews."
          align="left"
        />
        <div className="mt-14">
          <MentorsGrid mentors={mentors} />
        </div>
      </div>
    </div>
  );
}
