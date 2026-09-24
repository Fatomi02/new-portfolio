import type { Profile } from "@/lib/content-types";

export const profile: Profile = {
  name: "Fatomi Abdul-Rahmon Olaitan",

  role: "Frontend Engineer",

  tagline:
    "I build and maintain production interfaces in React, Angular and Vue — component libraries, API integrations, and the performance and accessibility work that keeps them usable.",

  bio: [
    "I'm a frontend engineer based in Ibadan, Nigeria. I currently work at Phane, building interactive interfaces with React and Redux, integrating APIs and keeping the frontend fast, responsive and accessible.",
    "Before Phane I was at Sysserve, where I built and maintained web and mobile applications in Angular, Ionic and Stencil. The work I'm most pleased with there was a reusable component library built on Angular Material — it cut the time it took to ship new features, because the next person no longer had to rebuild the same pieces.",
    "I started out in technical support at Sycamore, troubleshooting issues for real users before I was writing the code they used. That's shaped how I build: I'd rather catch a confusing state in review than explain it in a support thread. I hold a B.Tech in Computer Engineering from LAUTECH, and I've volunteered as a JavaScript tutor teaching core concepts to students.",
  ],

  location: "Ibadan, Nigeria",

  // The address on your CV. Change it here if you'd rather use another one —
  // the contact form, the footer link and the JSON-LD all read from this.
  email: "fatomiabdulrahmon@gmail.com",

  socials: [
    { label: "GitHub", href: "https://github.com/fatomi02" },
    { label: "LinkedIn", href: "https://linkedin.com/in/fatomi-abdulrahmon/" },
  ],

  resumeUrl: "/resume.pdf",

  // Shows the badge at the top of the hero. Set to false when you stop
  // looking — a stale "available" badge is worse than none.
  availableForWork: true,

  skills: [
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "Angular",
    "Vue.js",
    "Ionic",
    "Stencil.js",
    "Tailwind CSS",
    "Node.js",
    "Firebase",
    "Git",
  ],

  // Local development fallback only — you do not need to change this.
  //
  // On Vercel the real address is picked up automatically from the
  // project's production domain, so canonical URLs, Open Graph tags, the
  // sitemap and the RSS feed are all correct the moment you deploy. If you
  // later put a custom domain in front, set NEXT_PUBLIC_SITE_URL to it.
  // See lib/site-url.ts.
  siteUrl: "http://localhost:3000",
};
