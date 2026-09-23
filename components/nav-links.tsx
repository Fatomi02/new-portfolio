"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/projects", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="flex items-center gap-5 sm:gap-7">
      {links.map(({ href, label }) => {
        // "/#contact" is a home-page anchor, never a section of its own
        const isCurrent = !href.includes("#") && pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            aria-current={isCurrent ? "page" : undefined}
            className={`text-sm transition-colors ${
              isCurrent ? "text-fg" : "text-muted hover:text-fg"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
