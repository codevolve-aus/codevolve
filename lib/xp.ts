import { STAGE_META, STAGE_ORDER, type EvolutionStage } from "@/lib/evolution";

// Total XP required to *reach* each stage.
export const STAGE_THRESHOLDS: Record<EvolutionStage, number> = {
  init: 0,
  commit: 100,
  merge: 300,
  deploy: 600,
};

export interface EvolutionProgress {
  xp: number;
  stage: EvolutionStage;
  stageMeta: (typeof STAGE_META)[EvolutionStage];
  nextStage: EvolutionStage | null;
  xpIntoStage: number;
  xpForStage: number;
  percentToNext: number;
}

export function evolutionFromXp(xp: number): EvolutionProgress {
  let stage: EvolutionStage = "init";
  for (const s of STAGE_ORDER) {
    if (xp >= STAGE_THRESHOLDS[s]) stage = s;
  }

  const idx = STAGE_ORDER.indexOf(stage);
  const nextStage = idx < STAGE_ORDER.length - 1 ? STAGE_ORDER[idx + 1] : null;
  const currentFloor = STAGE_THRESHOLDS[stage];
  const nextCeiling = nextStage ? STAGE_THRESHOLDS[nextStage] : currentFloor;
  const xpIntoStage = xp - currentFloor;
  const xpForStage = nextCeiling - currentFloor;
  const percentToNext = nextStage ? Math.min(100, Math.round((xpIntoStage / xpForStage) * 100)) : 100;

  return {
    xp,
    stage,
    stageMeta: STAGE_META[stage],
    nextStage,
    xpIntoStage,
    xpForStage,
    percentToNext,
  };
}
