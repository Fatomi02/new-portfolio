import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="border-line/70 mt-[var(--spacing-section)] border-t">
      <div className="container-page flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted text-sm">
          © {new Date().getFullYear()} {profile.name}
        </p>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {profile.socials.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-muted hover:text-fg text-sm transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`mailto:${profile.email}`}
              className="text-muted hover:text-fg text-sm transition-colors"
            >
              Email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
