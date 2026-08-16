import Link from "next/link";
import { SidebarShell } from "./Sidebar";
import { SIDEBAR_LINKS } from "./sidebar-links";

// Static fallback shown while the interactive (client, usePathname-based) Sidebar streams in —
// same links, no active-state highlighting. Keeps the dashboard shell prerenderable.
export default function SidebarSkeleton() {
  return (
    <SidebarShell>
      {SIDEBAR_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
        >
          {link.label}
        </Link>
      ))}
    </SidebarShell>
  );
}
