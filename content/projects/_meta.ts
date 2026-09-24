import type { ProjectMeta } from "@/lib/content-types";

/**
 * Drawn from the TOP PROJECTS section of your CV, plus your final-year
 * research project.
 *
 * Your old portfolio (portfolio-five-bice-11.vercel.app) is deliberately
 * left out — this site replaces it, and linking to it from here invites a
 * comparison you don't need.
 *
 * Covers are null for now, so each card renders the typographic fallback.
 * Add screenshots to public/images/projects/ and point `cover` at them.
 */
export const projects: ProjectMeta[] = [
  {
    slug: "sysserve-website",
    title: "Sysserve Solutions",
    summary:
      "The public website for Sysserve, the facility and asset management company I worked at — built and maintained alongside their product work.",
    year: "2024",
    role: "Software Engineer",
    // TODO: confirm — this is inferred from the stack you used at Sysserve
    stack: ["Angular", "TypeScript", "Tailwind CSS"],
    links: [{ label: "Live site", href: "https://sysservesolutions.com" }],
    cover: null,
    featured: true,
  },
  {
    slug: "acta-bioscientia",
    title: "Acta Bioscientia",
    summary:
      "A publishing site for an academic journal — article browsing, issue archives and submission information for researchers.",
    year: "2024",
    role: "Frontend Developer",
    // TODO: confirm the stack
    stack: ["JavaScript", "HTML", "CSS"],
    links: [{ label: "Live site", href: "https://actabioscientia.org" }],
    cover: null,
    featured: true,
  },
  {
    slug: "traffic-offender-reporting",
    title: "Traffic Offender Reporting",
    summary:
      "My final-year research project: a database of registered vehicle plate numbers that lets the public identify and report traffic offenders to the police and the FRSC.",
    year: "2024",
    role: "Undergraduate Researcher & Developer",
    // TODO: confirm the stack you built this in
    stack: ["JavaScript", "Node.js", "Firebase"],
    links: [],
    cover: null,
    featured: true,
  },
  {
    slug: "zeta",
    title: "Zeta",
    summary:
      "A fintech application built as the final project of the Sycamore internship training programme.",
    year: "2023",
    role: "Frontend Developer",
    // Inferred: your Vue certificate came from the same Sycamore training,
    // so Zeta was most likely built in Vue. Correct this if it wasn't.
    stack: ["Vue.js", "JavaScript", "Tailwind CSS"],
    links: [{ label: "Live site", href: "https://zeta-nine.vercel.app" }],
    cover: null,
    featured: true,
  },
];

/** Home page shows these; /projects shows everything. */
export const featuredProjects = projects.filter((project) => project.featured);
