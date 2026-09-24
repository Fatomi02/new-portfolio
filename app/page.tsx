import type { Metadata } from "next";
import Link from "next/link";
import { About } from "@/components/about";
import { Certifications } from "@/components/certifications";
import { ContactSection } from "@/components/contact-section";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { ProjectGrid } from "@/components/project-grid";
import { Section } from "@/components/section";
import { Timeline } from "@/components/timeline";
import { certifications, education } from "@/content/education";
import { experience } from "@/content/experience";
import { featuredProjects, projects } from "@/content/projects/_meta";

function ArrowRight() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="arrow size-3.5"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const hasMoreProjects = projects.length > featuredProjects.length;

  return (
    <>
      <JsonLd />
      <Hero />

      <Section
        id="work"
        index="01"
        eyebrow="Selected work"
        title="Things I've built"
        action={
          hasMoreProjects ? (
            <Link
              href="/projects"
              className="arrow-link text-muted hover:text-fg text-sm"
            >
              All projects
              <ArrowRight />
            </Link>
          ) : undefined
        }
      >
        <ProjectGrid projects={featuredProjects} />
      </Section>

      <Section id="about" index="02" eyebrow="About" title="A bit about me">
        <About />
      </Section>

      <Section id="experience" index="03" eyebrow="Experience" title="Where I've worked">
        <Timeline entries={experience} />
      </Section>

      <Section id="education" index="04" eyebrow="Education" title="How I got here">
        <Timeline entries={education} />
        <Certifications items={certifications} />
      </Section>

      <ContactSection />
    </>
  );
}
