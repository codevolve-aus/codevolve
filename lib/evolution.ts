// Structural/branding constants — not editable content, so these stay static code
// rather than moving into the database with tracks/mentors/testimonials.

export type EvolutionStage = "init" | "commit" | "merge" | "deploy";

export const STAGE_ORDER: EvolutionStage[] = ["init", "commit", "merge", "deploy"];

export const STAGE_META: Record<
  EvolutionStage,
  { label: string; command: string; blurb: string; color: string }
> = {
  init: {
    label: "Init",
    command: "git init",
    blurb: "First lines of code. Orientation, tooling, and the fundamentals click into place.",
    color: "var(--stage-init)",
  },
  commit: {
    label: "Commit",
    command: "git commit",
    blurb: "Daily reps. You're shipping small, working pieces of real software.",
    color: "var(--stage-commit)",
  },
  merge: {
    label: "Merge",
    command: "git merge",
    blurb: "Team projects, code review, and collaborating the way real engineering teams do.",
    color: "var(--stage-merge)",
  },
  deploy: {
    label: "Deploy",
    command: "git push --deploy",
    blurb: "Portfolio-ready. Mock interviews, employer-facing projects, internship placement.",
    color: "var(--stage-deploy)",
  },
};
