import { type ReactNode } from "react";

export default function TerminalWindow({
  title = "codevolve — zsh",
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/40 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#f6465d]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#34d399]/70" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">{title}</span>
      </div>
      <div className="p-5 font-mono text-sm leading-relaxed text-foreground/90">{children}</div>
    </div>
  );
}
