import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}

/**
 * The masthead for a top-level page (/projects, /blog). Mirrors the
 * home page's section headers — index rule, eyebrow, display heading —
 * so moving between the home page and an inner page feels continuous.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: PageHeaderProps) {
  return (
    <header className="mb-14 sm:mb-20">
      <div className="mb-4 flex items-center gap-4">
        <span className="eyebrow">{eyebrow}</span>
        <span aria-hidden="true" className="rule" />
      </div>

      <h1 className="font-display text-h1 max-w-[18ch]">{title}</h1>

      {lead && (
        <p className="text-muted text-lead mt-6 max-w-[52ch]">{lead}</p>
      )}

      {children}
    </header>
  );
}
