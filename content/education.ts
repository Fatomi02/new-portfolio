import type { Certification, TimelineEntry } from "@/lib/content-types";

export const education: TimelineEntry[] = [
  {
    title: "B.Tech, Computer Engineering",
    organization: "Ladoke Akintola University of Technology",
    // TODO: add the year you started, e.g. start: "2019"
    end: "2024",
    location: "Oyo, Nigeria",
    points: [
      "Graduated with 4.20/5.0.",
      "Final-year research: a database of registered vehicle plate numbers for identifying and reporting traffic offenders in Nigeria, with submissions routed to the police and the FRSC.",
      "Vice President of the Computer Engineering Muslim Society, coordinating student activities.",
    ],
  },
];

/**
 * Rendered as a compact list under the education timeline. Course
 * certificates are worth showing but not worth a timeline row each.
 */
export const certifications: Certification[] = [
  { title: "React — Software Engineer", issuer: "Codecademy" },
  { title: "JavaScript: The Complete Full-Stack Web Development", issuer: "Udemy" },
  { title: "TypeScript: The Complete Developer's Guide", issuer: "Udemy" },
  { title: "Next.js — The Complete Guide", issuer: "Udemy" },
  { title: "Angular — Ultimate Courses", issuer: "Ultimate Courses" },
  { title: "Vue — Internship Training", issuer: "Sycamore" },
  { title: "Ionic — Build iOS, Android and Web Apps", issuer: "Udemy" },
  { title: "Stencil — Build Custom Web Components", issuer: "Udemy" },
];
