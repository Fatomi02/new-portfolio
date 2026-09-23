import type { Profile } from "@/lib/content-types";

/**
 * ────────────────────────────────────────────────────────────────
 *  PLACEHOLDER CONTENT — replace everything marked TODO.
 *  This is the only file you need to touch to change your name,
 *  bio, contact details and social links across the whole site.
 * ────────────────────────────────────────────────────────────────
 */
export const profile: Profile = {
  // TODO: your full name
  name: "Your Name",

  // TODO: the role you want to be hired for
  role: "Frontend Developer",

  // TODO: one or two sentences. What you build, and what you care about.
  tagline:
    "I build fast, accessible interfaces for the web — with a bias toward clean type, considered motion and code that stays readable.",

  // TODO: your About section. Each string is its own paragraph.
  bio: [
    "Write two or three short paragraphs here. Lead with what you do now and the kind of work you want more of — that is the sentence a recruiter actually reads.",
    "Use the second paragraph for how you work: the problems you like, the tools you reach for, what you have shipped and what you learned doing it.",
    "Keep the third short and human. What you are learning, building or reading at the moment is enough.",
  ],

  // TODO
  location: "Lagos, Nigeria",

  // TODO: the address you want in your inbox
  email: "you@example.com",

  // TODO: delete any you do not use
  socials: [
    { label: "GitHub", href: "https://github.com/yourusername" },
    { label: "LinkedIn", href: "https://linkedin.com/in/yourusername" },
    { label: "X", href: "https://x.com/yourusername" },
  ],

  // TODO: drop your CV at public/resume.pdf, or set this to null to hide the link
  resumeUrl: null,

  // TODO: the tools you actually want to be asked about in an interview
  skills: [
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Accessibility",
    "Testing Library",
    "Node.js",
    "Git",
  ],

  // TODO: set this to your real domain before deploying — canonical URLs,
  // Open Graph tags, the sitemap and RSS feed all read from it.
  siteUrl: "https://example.com",
};
