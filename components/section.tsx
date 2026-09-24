import type { ReactNode } from "react";

interface SectionProps {
  /** Anchor target — also what the header's "/#contact" style links point at */
  id?: string;
  /** Small caps label above the heading */
  eyebrow?: string;
  /** Two-digit index shown beside the eyebrow, e.g. "01" */
  index?: string;
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
  index,
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
        <div className="mb-10 sm:mb-14">
          {/* Index, label and a rule running out to the edge of the
              measure — the detail that makes a section feel placed
              rather than just stacked. */}
          {eyebrow && (
            <div className="mb-4 flex items-center gap-4">
              {index && (
                <span aria-hidden="true" className="section-index">
                  {index}
                </span>
              )}
              <span className="eyebrow">{eyebrow}</span>
              <span aria-hidden="true" className="rule" />
            </div>
          )}

          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
            {title && (
              <h2
                id={id ? `${id}-heading` : undefined}
                className="font-display text-h2"
              >
                {title}
              </h2>
            )}
            {action}
          </div>
        </div>
      )}
      {children}
    </section>
  );
}
