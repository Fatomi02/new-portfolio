import Image from "next/image";
import Link from "next/link";
import type { ProjectMeta } from "@/lib/content-types";

interface ProjectCardProps {
  project: ProjectMeta;
  /** Shown as a two-digit index in the card's corner */
  index: number;
  /** Eager-load the first card's image; it is usually above the fold */
  priority?: boolean;
}

export function ProjectCard({
  project,
  index,
  priority = false,
}: ProjectCardProps) {
  return (
    <article>
      {/*
        `group` sits on the link, not the article, so that group-hover
        reaches the image and title *and* the link keeps the global focus
        ring — putting it on the article silently loses the ring, since
        group-* only responds to the group element's own state.
      */}
      <Link href={`/projects/${project.slug}`} className="group block">
        <div className="surface relative aspect-[16/10] overflow-hidden rounded-2xl transition-[border-color,box-shadow,transform,opacity] duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1 group-hover:border-[var(--line-strong)] group-hover:shadow-[var(--shadow-lg)]">
          {project.cover ? (
            <Image
              src={project.cover}
              alt={project.coverAlt ?? ""}
              fill
              sizes="(min-width: 768px) 46vw, 92vw"
              priority={priority}
              className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
            />
          ) : (
            <PlaceholderPanel title={project.title} />
          )}

          {/* Index, top left */}
          <span
            aria-hidden="true"
            className="section-index bg-bg/70 absolute top-4 left-4 rounded-full px-2.5 py-1 backdrop-blur-sm"
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Affordance: a circular arrow that fades up on hover, so the
              card visibly behaves like a door rather than a picture. */}
          <span
            aria-hidden="true"
            className="bg-fg text-bg absolute right-4 bottom-4 grid size-9 translate-y-2 place-items-center rounded-full opacity-0 transition-[transform,opacity] duration-400 ease-[var(--ease-out-soft)] group-hover:translate-y-0 group-hover:opacity-100"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-3.5"
            >
              <path d="M5 11L11 5M6 5h5v5" />
            </svg>
          </span>
        </div>

        <div className="mt-5 flex items-baseline justify-between gap-4">
          <h3 className="text-h3 group-hover:text-accent font-medium transition-colors duration-300">
            {project.title}
          </h3>
          <span className="text-muted shrink-0 font-mono text-xs tabular-nums">
            {project.year}
          </span>
        </div>

        <p className="text-muted mt-2 text-sm leading-relaxed">
          {project.summary}
        </p>
      </Link>

      <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="border-line text-muted rounded-full border px-2.5 py-0.5 text-xs"
          >
            {tech}
          </li>
        ))}
      </ul>
    </article>
  );
}

/**
 * Stands in for a missing screenshot.
 *
 * Rather than repeating the project title in faint text — which duplicates
 * the heading directly below and reads as a mistake — this draws a quiet
 * ruled panel with the project's initials. It looks like a deliberate
 * cover, so the grid holds together before any screenshots exist.
 */
function PlaceholderPanel({ title }: { title: string }) {
  const initials = title
    .split(" ")
    .filter((word) => /[a-z]/i.test(word[0] ?? ""))
    .slice(0, 2)
    .map((word) => word[0]!.toUpperCase())
    .join("");

  return (
    <div
      aria-hidden="true"
      className="from-surface to-raised relative grid h-full place-items-center bg-gradient-to-br"
    >
      {/* Fine rule grid, faded out toward the bottom right */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse at 30% 25%, black, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 30% 25%, black, transparent 78%)",
        }}
      />
      <span className="font-display text-muted relative text-5xl tracking-tight opacity-70 sm:text-6xl">
        {initials}
      </span>
    </div>
  );
}
