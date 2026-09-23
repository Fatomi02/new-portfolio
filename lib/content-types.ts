/**
 * Shapes for everything under `content/`.
 *
 * These exist so that a typo or a missing field is a build error rather
 * than a blank space on the live site. If you add a field here, TypeScript
 * will point you at every content file that needs updating.
 */

export interface SocialLink {
  /** Shown as the link text, e.g. "GitHub" */
  label: string;
  href: string;
}

export interface Profile {
  /** Full name, used in the hero, metadata and JSON-LD */
  name: string;
  /** Job title, e.g. "Frontend Developer" */
  role: string;
  /** One or two sentences in the hero, directly under the name */
  tagline: string;
  /** Longer bio for the About section. Each string renders as a paragraph. */
  bio: string[];
  /** City, Country — shown in the About aside */
  location: string;
  /** Public contact address, used by the contact section and JSON-LD */
  email: string;
  socials: SocialLink[];
  /** Path under /public, or null to hide the CV link in the hero */
  resumeUrl: string | null;
  /** Technologies listed in the About aside */
  skills: string[];
  /** Absolute site URL, no trailing slash. Used for canonicals and OG tags. */
  siteUrl: string;
}

export interface TimelineEntry {
  /** Role title, or the qualification for education entries */
  title: string;
  /** Employer, or the institution for education entries */
  organization: string;
  /** Free text so you can write "2021" or "Mar 2021" as you prefer */
  start: string;
  /** Use "Present" for a current role */
  end: string;
  location?: string;
  /** Short achievement bullets. Keep to three or four. */
  points?: string[];
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectMeta {
  /** URL segment; must match the MDX filename in content/projects/ */
  slug: string;
  title: string;
  /** One line, shown on the card and in metadata */
  summary: string;
  /** Year or range, e.g. "2025" */
  year: string;
  /** Your role on the project, e.g. "Frontend Developer" */
  role: string;
  /** Technologies — shown as tags on the card */
  stack: string[];
  links: ProjectLink[];
  /** Path under /public. Null renders a typographic fallback card. */
  cover: string | null;
  /** Alt text for the cover image. Required whenever cover is set. */
  coverAlt?: string;
  /** Featured projects appear on the home page */
  featured: boolean;
}

export interface PostFrontmatter {
  title: string;
  /** ISO date, e.g. "2026-02-14" */
  date: string;
  summary: string;
  tags: string[];
  /** Drafts are visible in dev and hidden from the production build */
  draft?: boolean;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: string;
}
