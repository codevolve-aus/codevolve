import Link from "next/link";
import { cacheLife } from "next/cache";

const columns = [
  {
    heading: "Platform",
    links: [
      { href: "/tracks", label: "Tracks" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/pricing", label: "Pricing" },
      { href: "/dashboard", label: "Dashboard" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/mentors", label: "Mentors" },
      { href: "/success-stories", label: "Success stories" },
      { href: "/for-schools", label: "For schools" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "/delete-account", label: "Delete account" },
    ],
  },
];

export default async function Footer() {
  "use cache";
  cacheLife("days");

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-6 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-cyan-400 text-[10px] font-bold text-white">
                CV
              </div>
              <span className="font-mono text-sm font-semibold text-foreground">codevolve</span>
            </div>
            <p className="mt-4 max-w-[22ch] text-sm leading-relaxed text-muted-foreground">
              Evolve into an industry-ready developer, alongside school.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {col.heading}
              </h4>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <span>&copy; {year} CodeVolve Pty Ltd. All rights reserved.</span>
          <span className="font-mono">init · commit · merge · deploy</span>
        </div>
      </div>
    </footer>
  );
}
