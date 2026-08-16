import { Progress } from "@/components/ui/progress";
import type { EvolutionProgress } from "@/lib/xp";

export default function EvolutionBadge({ evolution }: { evolution: EvolutionProgress }) {
  const { stageMeta, xp, nextStage, percentToNext, xpIntoStage, xpForStage } = evolution;

  return (
    <div className="rounded-xl border border-border bg-card/60 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-xs text-muted-foreground">current stage</p>
          <div className="mt-1 flex items-baseline gap-2">
            <code className="font-mono text-lg font-semibold" style={{ color: stageMeta.color }}>
              {stageMeta.command}
            </code>
            <span className="text-sm text-muted-foreground">· {stageMeta.label}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="font-mono text-xs text-muted-foreground">total xp</p>
          <p className="font-mono text-2xl font-semibold text-foreground">{xp}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{stageMeta.blurb}</p>
      {nextStage ? (
        <div className="mt-5">
          <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
            <span>
              {xpIntoStage}/{xpForStage} xp to {nextStage}
            </span>
            <span>{percentToNext}%</span>
          </div>
          <Progress value={percentToNext} className="mt-2 h-1.5" />
        </div>
      ) : (
        <p className="mt-5 font-mono text-xs text-commit-green">
          Max stage reached — you&apos;re industry-ready. 🎉
        </p>
      )}
    </div>
  );
}
