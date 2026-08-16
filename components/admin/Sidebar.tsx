import Link from "next/link";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/tracks", label: "Tracks" },
  { href: "/admin/mentors", label: "Mentors" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/students", label: "Students" },
];

export default function Sidebar() {
  return (
    <nav className="flex shrink-0 flex-col gap-1 border-r border-border bg-sidebar px-3 py-6 md:w-56">
      <Link href="/admin" className="mb-6 flex items-center gap-2 px-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-cyan-400 text-[10px] font-bold text-white">
          CV
        </div>
        <span className="font-mono text-sm font-semibold text-sidebar-foreground">admin</span>
      </Link>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
        >
          {link.label}
        </Link>
      ))}
      <Link
        href="/dashboard"
        className="mt-4 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
      >
        ← Student dashboard
      </Link>
    </nav>
  );
}
