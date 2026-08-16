import { getTestimonials } from "@/lib/content";

export default async function Testimonials() {
  const testimonials = await getTestimonials();

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((t) => (
        <figure
          key={t.id}
          className="flex flex-col justify-between rounded-xl border border-border bg-card/60 p-6"
        >
          <blockquote className="text-sm leading-relaxed text-foreground/90">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-6 border-t border-border pt-4">
            <div className="text-sm font-medium text-foreground">{t.name}</div>
            <div className="text-xs text-muted-foreground">{t.context}</div>
            <div className="mt-2 font-mono text-xs text-commit-green">{t.outcome}</div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
