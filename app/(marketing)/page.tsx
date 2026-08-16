import Link from "next/link";
import Hero from "@/components/marketing/Hero";
import StatsBar from "@/components/marketing/StatsBar";
import WhySection from "@/components/marketing/WhySection";
import EvolutionPath from "@/components/marketing/EvolutionPath";
import SectionHeading from "@/components/marketing/SectionHeading";
import TrackCard from "@/components/marketing/TrackCard";
import MentorsGrid from "@/components/marketing/MentorsGrid";
import Testimonials from "@/components/marketing/Testimonials";
import ForSchoolsCTA from "@/components/marketing/ForSchoolsCTA";
import FinalCTA from "@/components/marketing/FinalCTA";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getAllTracks, getMentors } from "@/lib/content";

export default async function Home() {
  const [tracks, mentors] = await Promise.all([getAllTracks(), getMentors()]);

  return (
    <>
      <Hero />
      <StatsBar />
      <WhySection />

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="The evolution path"
            title="Every student's journey is a commit history"
            description="Progress isn't a percentage bar — it's a real engineering workflow, from your first line of code to a deployed portfolio."
          />
          <div className="mt-14">
            <EvolutionPath />
          </div>
          <div className="mt-8 text-center">
            <Link href="/how-it-works" className="text-sm text-primary hover:underline">
              See how the evolution path works →
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Career tracks"
            title="Pick a track. Ship real projects. Evolve."
            description="Two tracks are open for enrollment now — four more are in development."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tracks.map((track) => (
              <TrackCard key={track.slug} track={track} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/tracks"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-6")}
            >
              View all tracks
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card/30 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Your mentors"
            title="Learn from engineers actually shipping software"
            description="Every track is guided by practicing industry engineers — not just pre-recorded video."
          />
          <div className="mt-14">
            <MentorsGrid mentors={mentors.slice(0, 3)} />
          </div>
          <div className="mt-10 text-center">
            <Link href="/mentors" className="text-sm text-primary hover:underline">
              Meet the full mentor network →
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Success stories"
            title="From first commit to industry-ready"
          />
          <div className="mt-14">
            <Testimonials />
          </div>
        </div>
      </section>

      <ForSchoolsCTA />
      <FinalCTA />
    </>
  );
}
