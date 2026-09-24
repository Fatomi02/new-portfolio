import type { TimelineEntry } from "@/lib/content-types";

/**
 * No dates, by choice. The Timeline drops the date column entirely when
 * no entry carries one, so this reads as a clean list rather than a
 * timeline with a gap where the years should be.
 *
 * Because there are no dates, the order of this array is the only signal
 * of recency a reader gets — keep the most recent role first.
 */
export const experience: TimelineEntry[] = [
  {
    title: "Software Engineer",
    organization: "Phane",
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
    location: "Lagos, Nigeria",
    points: [
      "Diagnosed and resolved software and system issues for users, escalating to engineering where needed.",
      "Tested and validated new features and product updates ahead of release.",
      "Documented recurring issues and their fixes so the team could resolve them faster.",
    ],
  },
];
