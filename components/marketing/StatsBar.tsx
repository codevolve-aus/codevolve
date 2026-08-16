const stats = [
  { value: "500+", label: "students evolving" },
  { value: "92%", label: "industry-ready by graduation*" },
  { value: "40+", label: "industry mentors" },
  { value: "6", label: "career tracks" },
];

export default function StatsBar() {
  return (
    <section className="border-y border-border bg-card/40 px-6 py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center sm:text-left">
            <div className="font-mono text-3xl font-semibold text-gradient">{s.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-6xl text-xs text-muted-foreground/70">
        *Illustrative target outcome based on program design — not an audited placement figure.
      </p>
    </section>
  );
}
