import type { ReactNode } from "react";

interface SectionProps {
  /** Anchor target — also what the header's "/#contact" style links point at */
  id?: string;
  /** Small caps label above the heading */
  eyebrow?: string;
  /** Section heading. Omit for sections that supply their own. */
  title?: string;
  /** Optional link rendered opposite the heading, e.g. "All projects →" */
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * Every home-page section goes through here, so vertical rhythm and the
 * heading treatment stay consistent by construction rather than by
 * remembering to repeat the same classes.
 */
export function Section({
  id,
  eyebrow,
  title,
  action,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={id && title ? `${id}-heading` : undefined}
      className={`container-page pt-[var(--spacing-section)] ${className}`}
      style={{ scrollMarginTop: "5rem" }}
    >
      {(eyebrow || title) && (
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 sm:mb-14">
          <div>
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            {title && (
              <h2
                id={id ? `${id}-heading` : undefined}
                className="font-display text-h2"
              >
                {title}
              </h2>
            )}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
