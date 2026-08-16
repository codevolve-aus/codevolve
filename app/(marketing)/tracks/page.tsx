import type { Metadata } from "next";
import SectionHeading from "@/components/marketing/SectionHeading";
import TrackCard from "@/components/marketing/TrackCard";
import { getAllTracks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tracks",
  description:
    "Six career tracks for school students and college grads — from Full-Stack Web Development to Cybersecurity, taught by industry mentors.",
};

export default async function TracksPage() {
  const tracks = await getAllTracks();
  const open = tracks.filter((t) => !t.comingSoon);
  const comingSoon = tracks.filter((t) => t.comingSoon);

  return (
    <div className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Career tracks"
          title="Pick your track"
          description="Every track runs on the same evolution path — init, commit, merge, deploy — with mentor-led projects at every stage."
          align="left"
        />

        <h2 className="mt-16 font-mono text-xs uppercase tracking-widest text-commit-green">
          Open for enrollment
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {open.map((track) => (
            <TrackCard key={track.slug} track={track} />
          ))}
        </div>

        <h2 className="mt-16 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          In development
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {comingSoon.map((track) => (
            <TrackCard key={track.slug} track={track} />
          ))}
        </div>
      </div>
    </div>
  );
}
