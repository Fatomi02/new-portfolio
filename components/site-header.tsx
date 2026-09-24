import Link from "next/link";
import { HeaderShell } from "@/components/header-shell";
import { NavLinks } from "@/components/nav-links";
import { ThemeToggle } from "@/components/theme-toggle";
import { profile } from "@/content/profile";

export function SiteHeader() {
  return (
    <HeaderShell>
      <div className="container-page flex h-16 items-center justify-between gap-4">
        {/*
          A long name plus the nav does not fit on a 375px screen, and
          truncating mid-word ("Fatomi Abdul-R…") looks broken. So the
          wordmark shortens to the first name on small screens. Both
          variants are hidden from assistive tech and the link carries the
          full name as its accessible name, so nothing is read twice.
        */}
        <Link
          href="/"
          aria-label={`${profile.name} — home`}
          className="hover:text-accent group flex items-center gap-2.5 text-sm font-medium tracking-tight transition-colors"
        >
          <span
            aria-hidden="true"
            className="bg-accent size-1.5 shrink-0 rounded-full transition-transform duration-300 group-hover:scale-125"
          />
          <span aria-hidden="true" className="sm:hidden">
            {profile.name.split(" ")[0]}
          </span>
          <span aria-hidden="true" className="hidden sm:inline">
            {profile.name}
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-5 sm:gap-7">
          <NavLinks />
          <ThemeToggle />
        </div>
      </div>
    </HeaderShell>
  );
}
