import type { TimelineEntry } from "@/lib/content-types";

/**
 * TODO — your CV doesn't give dates for any of these roles, so the years
 * below are placeholders. Replace every "20XX" with the real month or year
 * (e.g. start: "Mar 2024"). Recruiters look for these first.
 */
export const experience: TimelineEntry[] = [
  {
    title: "Software Engineer",
    organization: "Phane",
    start: "20XX",
    end: "Present",
    location: "United Kingdom · Remote",
    points: [
      "Build and maintain interactive user interfaces in React and Redux, and keep them working as the product changes.",
      "Integrate APIs and manage client state so data flows predictably through the application.",
      "Optimise for performance, responsiveness and accessibility across the frontend.",
      "Work with designers and backend engineers to take UI designs through to shipped features.",
    ],
  },
  {
    title: "Software Engineer",
    organization: "Sysserve",
    start: "20XX",
    end: "20XX",
    location: "Lagos, Nigeria",
    points: [
      "Built a reusable component library on Angular Material, cutting the time needed to ship new features.",
      "Built and maintained a modular single-page Angular application, responsive across screen sizes.",
      "Integrated third-party APIs for data exchange and real-time updates.",
      "Shipped cross-platform web and mobile features with Ionic and Stencil.",
    ],
  },
  {
    title: "Technical Support",
    organization: "Sycamore",
    start: "20XX",
    end: "20XX",
    location: "Lagos, Nigeria",
    points: [
      "Diagnosed and resolved software and system issues for users, escalating to engineering where needed.",
      "Tested and validated new features and product updates ahead of release.",
      "Documented recurring issues and their fixes so the team could resolve them faster.",
    ],
  },
];
