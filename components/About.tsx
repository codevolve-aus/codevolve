const values = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L2 7l8 5 8-5-8-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M2 13l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: "AI-First Thinking",
    description:
      "Every product we build starts with AI at the core — not bolted on after the fact. We design for a world where AI is a natural collaborator.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Product Excellence",
    description:
      "We obsess over how people actually work. Our products are designed to feel effortless, fitting naturally into everyday workflows without friction.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M17 3L3 17M8 3h9v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Relentless Iteration",
    description:
      "The AI landscape moves fast. We stay at the frontier by iterating quickly, learning continuously, and shipping with purpose.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-28 px-6 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-violet-800/10 blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <div>
            <p className="text-xs uppercase tracking-widest text-violet-400 font-medium mb-4">Who we are</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Building with AI,{" "}
              <span className="text-white/40">one product at a time.</span>
            </h2>
            <p className="text-white/50 leading-relaxed mb-5">
              CodeVolve Pty Ltd is an AI product company on a mission to create products that genuinely change how
              people work. We use AI not as a feature, but as the foundation — building tools that are intelligent,
              adaptive, and immediately useful.
            </p>
            <p className="text-white/50 leading-relaxed">
              We build across a range of industries and use cases — from commerce and deals to software and automation —
              all unified by a single goal: making hard things easy through AI.
            </p>
          </div>

          {/* Right values */}
          <div className="flex flex-col gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="flex gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                <div className="shrink-0 w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center">
                  {v.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-1">{v.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
