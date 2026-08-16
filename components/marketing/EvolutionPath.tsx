import { STAGE_ORDER, STAGE_META } from "@/lib/evolution";

export default function EvolutionPath({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div
        aria-hidden
        className="absolute top-8 right-8 left-8 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block"
      />
      {STAGE_ORDER.map((stage, i) => {
        const meta = STAGE_META[stage];
        return (
          <div
            key={stage}
            className="relative flex flex-col gap-3 rounded-xl border border-border bg-card/60 p-5"
          >
            <div className="flex items-center gap-3">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border font-mono text-xs font-semibold"
                style={{ color: meta.color, boxShadow: `0 0 0 1px ${meta.color}33 inset` }}
              >
                {i + 1}
              </span>
              <code className="font-mono text-sm font-medium" style={{ color: meta.color }}>
                {meta.command}
              </code>
            </div>
            <h3 className="text-sm font-semibold text-foreground">{meta.label} Stage</h3>
            {!compact && (
              <p className="text-sm leading-relaxed text-muted-foreground">{meta.blurb}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
