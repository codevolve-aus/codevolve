import type { Metadata } from "next";
import SectionHeading from "@/components/marketing/SectionHeading";

export const metadata: Metadata = {
  title: "About",
  description: "Why CodeVolve exists, and what we believe about how students learn to build software.",
};

export default function AboutPage() {
  return (
    <div className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="About CodeVolve" title="Software careers shouldn't start at 22" align="left" />

        <div className="mt-10 flex flex-col gap-6 text-pretty leading-relaxed text-muted-foreground">
          <p>
            Most students don’t find out whether they actually like building software until
            their first year of a computer science degree — or their first internship, if they’re
            lucky. By then, students who had earlier access to real projects and real mentors
            already have a head start that’s hard to close.
          </p>
          <p>
            CodeVolve exists to close that gap earlier. We built a training track specifically for
            school students and college grads — not a shortened version of a bootcamp, but a
            program designed from the ground up to fit around school and college hours, taught by
            engineers who are still writing production code.
          </p>
          <p>
            We built the whole program around a metaphor that’s also literally true: software
            careers evolve the way software itself does. You <span className="font-mono text-foreground">init</span> a
            project with the fundamentals, <span className="font-mono text-foreground">commit</span> daily
            practice, <span className="font-mono text-foreground">merge</span> your work into real
            collaboration, and <span className="font-mono text-foreground">deploy</span> — a
            portfolio, a set of skills, and the confidence to walk into an interview.
          </p>
          <p>
            CodeVolve is based in Australia and partners directly with schools, colleges, and
            individual students who want a real head start on an IT career.
          </p>
        </div>
      </div>
    </div>
  );
}
