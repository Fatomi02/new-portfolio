import Link from "next/link";
import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="border-line mt-[var(--spacing-section)] border-t">
      <div className="container-page py-16 sm:py-20">
        {/* A closing call to action rather than a bare copyright line —
            the footer is the last thing a recruiter scrolls past, so it
            should still be asking for the reply. */}
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="eyebrow mb-4">Get in touch</p>
            <a
              href={`mailto:${profile.email}`}
              className="font-display text-h2 hover:text-accent inline-block transition-colors duration-300"
            >
              {profile.email}
            </a>
          </div>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {profile.socials.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="arrow-link text-muted hover:text-fg text-sm"
                >
                  {label}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="arrow size-3"
                  >
                    <path d="M5 11L11 5M6 5h5v5" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-line mt-14 flex flex-wrap items-center justify-between gap-4 border-t pt-8">
          <p className="text-muted text-sm">
            © {new Date().getFullYear()} {profile.name}
          </p>

          <div className="text-muted flex items-center gap-6 text-sm">
            <Link href="/rss.xml" className="hover:text-fg transition-colors">
              RSS
            </Link>
            <a href="#main" className="arrow-link hover:text-fg">
              Back to top
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-3"
              >
                <path d="M8 13V3M4 7l4-4 4 4" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
