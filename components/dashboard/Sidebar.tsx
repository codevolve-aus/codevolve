"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SIDEBAR_LINKS } from "./sidebar-links";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <SidebarShell>
      {SIDEBAR_LINKS.map((link) => {
        const active = link.exact ? pathname === link.href : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-lg px-3 py-2 text-sm transition-colors",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </SidebarShell>
  );
}

export function SidebarShell({ children }: { children: React.ReactNode }) {
  return (
    <nav className="flex shrink-0 flex-col gap-1 border-r border-border bg-sidebar px-3 py-6 md:w-56">
      <Link href="/" className="mb-6 flex items-center gap-2 px-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-cyan-400 text-[10px] font-bold text-white">
          CV
        </div>
        <span className="font-mono text-sm font-semibold text-sidebar-foreground">codevolve</span>
      </Link>
      {children}
      <Link
        href="/tracks"
        className="mt-4 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
      >
        ← Browse tracks
      </Link>
    </nav>
  );
}
