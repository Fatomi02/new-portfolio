import type { Certification } from "@/lib/content-types";
import { Reveal } from "@/components/reveal";

interface CertificationsProps {
  items: Certification[];
}

/**
 * A compact list under the education timeline. Course certificates are
 * worth showing but not worth a full timeline row each, so they get a
 * denser treatment.
 */
export function Certifications({ items }: CertificationsProps) {
  if (items.length === 0) return null;

  return (
    <Reveal className="mt-14">
      <h3 className="eyebrow mb-6">Certifications</h3>

      <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={`${item.issuer}-${item.title}`}
            className="border-line/70 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b pb-3"
          >
            <span className="text-sm">{item.title}</span>
            <span className="text-muted shrink-0 font-mono text-xs">
              {item.issuer}
            </span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
