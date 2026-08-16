import SectionHeading from "@/components/marketing/SectionHeading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const items = [
  {
    stat: "01",
    title: "Learn alongside school, not instead of it",
    body: "A few focused hours a week — self-paced lessons plus live mentor sessions, built around your school or college timetable, not against it.",
  },
  {
    stat: "02",
    title: "Real mentors, not just video lessons",
    body: "Every track is guided by a practicing industry engineer who reviews your code, unblocks you, and preps you for real interviews.",
  },
  {
    stat: "03",
    title: "A portfolio, not just a certificate",
    body: "You'll graduate every track with deployed, working projects — the thing that actually gets noticed in an application, not a PDF.",
  },
  {
    stat: "04",
    title: "Project-based, from lesson one",
    body: "No abstract theory dumps. Every module ships something real — the same way engineering teams actually work.",
  },
];

export default function WhySection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Why CodeVolve"
          title="Built for how students actually learn to build things"
          description="Not another video course you abandon in week two. A structured evolution path with real accountability."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {items.map((item) => (
            <Card key={item.stat} className="border-border bg-card/60">
              <CardHeader>
                <span className="font-mono text-xs text-muted-foreground">{item.stat}</span>
                <CardTitle className="mt-2 text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
