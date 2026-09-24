import type { TimelineEntry } from "@/lib/content-types";
import { Reveal } from "@/components/reveal";

interface TimelineProps {
  entries: TimelineEntry[];
}

/**
 * Shared by Experience and Education — both are the same shape of data,
 * so they get the same treatment: dates in a narrow left rail on wide
 * screens, stacked above the entry on narrow ones.
 *
 * If no entry in the list carries a date, the rail is dropped entirely
 * rather than left as an empty column pushing everything to the right.
 */
export function Timeline({ entries }: TimelineProps) {
  const hasDates = entries.some((entry) => entry.start || entry.end);

  return (
    <ol className="divide-line/70 divide-y">
      {entries.map((entry, index) => (
        <li key={`${entry.organization}-${entry.title}`}>
          <Reveal delay={index * 0.06}>
            <div
              className={`grid gap-x-10 gap-y-2 py-8 sm:py-10 ${
                hasDates ? "sm:grid-cols-[9rem_1fr]" : ""
              }`}
            >
              {hasDates && (
                <p className="text-muted pt-1 font-mono text-xs tracking-wide tabular-nums">
                  {/* A single-date entry (a graduation year) shows just the
                      one date rather than "2024 — 2024". */}
                  {entry.start && entry.end ? (
                    <>
                      {entry.start}
                      <span aria-hidden="true"> — </span>
                      <span className="sr-only">to</span>
                      {entry.end}
                    </>
                  ) : (
                    (entry.start ?? entry.end)
                  )}
                </p>
              )}

              <div>
                <h3 className="text-h3 font-medium">{entry.title}</h3>
                <p className="text-muted mt-1 text-sm">
                  {entry.organization}
                  {entry.location && (
                    <>
                      <span aria-hidden="true" className="mx-2 opacity-50">
                        ·
                      </span>
                      {entry.location}
                    </>
                  )}
                </p>

                {entry.points && entry.points.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {entry.points.map((point) => (
                      <li
                        key={point}
                        className="text-muted relative pl-5 text-sm leading-relaxed"
                      >
                        <span
                          aria-hidden="true"
                          className="bg-accent absolute top-[0.6em] left-0 size-1 rounded-full"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
