import Image from "next/image";
import Link from "next/link";
import type { ProjectMeta } from "@/lib/content-types";

interface ProjectCardProps {
  project: ProjectMeta;
  /** Eager-load the first card's image; it is usually above the fold */
  priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <article>
      {/*
        `group` sits on the link, not the article, so that group-hover
        reaches the image and title *and* the link keeps the global focus
        ring — putting it on the article silently loses the ring, since
        group-* only responds to the group element's own state.
      */}
      <Link href={`/projects/${project.slug}`} className="group block">
        <div className="bg-surface border-line/70 relative aspect-[16/10] overflow-hidden rounded-xl border">
          {project.cover ? (
            <Image
              src={project.cover}
              alt={project.coverAlt ?? ""}
              fill
              sizes="(min-width: 768px) 46vw, 92vw"
              priority={priority}
              className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
            />
          ) : (
            /* No screenshot yet — a typographic placeholder reads as a
               deliberate choice rather than a missing image. */
            <div className="grid h-full place-items-center p-8">
              {/* /80 rather than something fainter: at 36px this needs
                  3:1 to pass AA, and /80 clears it in both themes. */}
              <span
                aria-hidden="true"
                className="font-display text-muted/80 text-center text-4xl sm:text-5xl"
              >
                {project.title}
              </span>
            </div>
          )}
        </div>

        <div className="mt-5 flex items-baseline justify-between gap-4">
          <h3 className="text-h3 group-hover:text-accent font-medium transition-colors">
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
