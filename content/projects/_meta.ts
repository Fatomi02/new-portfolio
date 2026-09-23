import type { ProjectMeta } from "@/lib/content-types";

/**
 * PLACEHOLDER — replace with your real projects.
 *
 * To add a project:
 *   1. Add an entry here (order in this array = order on the site).
 *   2. Create content/projects/<slug>.mdx for the case study.
 *   3. Drop a cover image in public/images/projects/.
 *
 * `slug` must match the MDX filename exactly — the build fails if it
 * does not, so a broken link can never reach production.
 */
export const projects: ProjectMeta[] = [
  {
    slug: "project-one",
    title: "Project One",
    summary:
      "One sentence on what it does and who it is for. Lead with the outcome, not the stack.",
    year: "2025",
    role: "Frontend Developer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    links: [
      { label: "Live site", href: "https://example.com" },
      { label: "Source", href: "https://github.com/yourusername/project-one" },
    ],
    cover: null,
    featured: true,
  },
  {
    slug: "project-two",
    title: "Project Two",
    summary:
      "Another one-liner. If the project is visual, say what it looks like; if it is technical, say what was hard.",
    year: "2025",
    role: "Frontend Developer",
    stack: ["React", "Vite", "CSS Modules"],
    links: [{ label: "Live site", href: "https://example.com" }],
    cover: null,
    featured: true,
  },
  {
    slug: "project-three",
    title: "Project Three",
    summary:
      "Older or smaller work still earns a slot — it shows range and a habit of finishing things.",
    year: "2024",
    role: "Developer",
    stack: ["JavaScript", "Node.js"],
    links: [
      {
        label: "Source",
        href: "https://github.com/yourusername/project-three",
      },
    ],
    cover: null,
    featured: false,
  },
];

/** Home page shows these; /projects shows everything. */
export const featuredProjects = projects.filter((project) => project.featured);
