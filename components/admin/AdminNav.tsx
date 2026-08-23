"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/profile", label: "Profile" },
  { href: "/admin/stats", label: "Stats" },
  { href: "/admin/practice", label: "Practice" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-1">
      {LINKS.map((link) => {
        const active = pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`font-mono text-[0.72rem] uppercase tracking-[0.08em] rounded-[3px] px-3 py-1.5 transition-colors ${
              active
                ? "bg-bg-raised text-accent border border-accent"
                : "text-text-dim border border-transparent hover:text-text"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
