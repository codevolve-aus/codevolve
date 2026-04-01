const products = [
  {
    tag: "AI Commerce",
    title: "Scout",
    description:
      "AI-powered deals platform that surfaces the best offers, matches buyers with sellers intelligently, and automates negotiation — so you always close at the right price.",
    status: "Live",
    gradient: "from-orange-600/20 to-amber-600/10",
    accent: "orange",
    features: ["AI-powered deal discovery", "Smart price matching", "Automated deal workflows"],
  },
  {
    tag: "Developer Productivity",
    title: "AI-Powered Code Review",
    description:
      "Intelligent code review that understands context, catches bugs before they ship, and coaches engineers with actionable feedback — at the speed of your CI pipeline.",
    status: "In Development",
    gradient: "from-violet-600/20 to-fuchsia-600/10",
    accent: "violet",
    features: ["Semantic diff analysis", "Security vulnerability detection", "Style & pattern enforcement"],
  },
  {
    tag: "Workflow Automation",
    title: "Engineering Copilot",
    description:
      "An AI agent deeply integrated into your engineering workflow — triaging issues, writing boilerplate, generating tests, and keeping your team unblocked.",
    status: "Coming Soon",
    gradient: "from-cyan-600/20 to-blue-600/10",
    accent: "cyan",
    features: ["Issue triage & categorization", "Test generation", "Documentation automation"],
  },
  {
    tag: "Platform Intelligence",
    title: "Codebase Insights",
    description:
      "Deep analytics and AI-driven insights into your codebase health — surfacing complexity, tech debt, and team velocity patterns that matter to engineering leaders.",
    status: "Coming Soon",
    gradient: "from-emerald-600/20 to-teal-600/10",
    accent: "emerald",
    features: ["Complexity heatmaps", "Tech debt scoring", "Team velocity trends"],
  },
];

const accentColors: Record<string, string> = {
  orange: "text-orange-400 border-orange-500/30 bg-orange-500/10",
  violet: "text-violet-400 border-violet-500/30 bg-violet-500/10",
  cyan: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
  emerald: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
};

const dotColors: Record<string, string> = {
  orange: "bg-orange-400",
  violet: "bg-violet-400",
  cyan: "bg-cyan-400",
  emerald: "bg-emerald-400",
};

export default function Products() {
  return (
    <section id="products" className="py-28 px-6 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-cyan-800/10 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-cyan-400 font-medium mb-4">What we build</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Products built for{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              the AI era
            </span>
          </h2>
          <p className="text-white/45 max-w-xl mx-auto">
            Each product targets a real problem in the world, powered by the latest advances in AI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {products.map((product) => (
            <div
              key={product.title}
              className={`relative rounded-2xl border border-white/8 bg-gradient-to-br ${product.gradient} p-6 flex flex-col hover:border-white/15 transition-all duration-300 hover:-translate-y-1`}
            >
              {/* Tag & status */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs text-white/40 font-medium">{product.tag}</span>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                    accentColors[product.accent]
                  }`}
                >
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${dotColors[product.accent]} mr-1.5 align-middle`} />
                  {product.status}
                </span>
              </div>

              <h3 className="text-white font-semibold text-lg mb-3">{product.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed mb-6 flex-1">{product.description}</p>

              {/* Features */}
              <ul className="flex flex-col gap-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-white/40">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
