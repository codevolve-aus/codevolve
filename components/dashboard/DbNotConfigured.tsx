export default function DbNotConfigured() {
  return (
    <div className="rounded-xl border border-dashed border-border bg-card/40 p-8 text-center">
      <p className="font-mono text-xs text-muted-foreground">DATABASE_URL not set</p>
      <h2 className="mt-3 text-lg font-semibold text-foreground">
        Connect a database to unlock progress tracking
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        Run <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-cyan">vercel integration add neon</code>{" "}
        (or provision Neon from the Vercel dashboard) and pull the env vars locally with{" "}
        <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-cyan">vercel env pull</code>.
      </p>
    </div>
  );
}
