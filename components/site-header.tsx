import Link from "next/link";
import { NavLinks } from "@/components/nav-links";
import { ThemeToggle } from "@/components/theme-toggle";
import { profile } from "@/content/profile";

export function SiteHeader() {
  return (
    <header className="border-line/70 bg-bg/80 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="hover:text-accent truncate text-sm font-medium tracking-tight transition-colors"
        >
          {profile.name}
        </Link>

        <div className="flex shrink-0 items-center gap-5 sm:gap-7">
          <NavLinks />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
