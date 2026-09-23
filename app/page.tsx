import type { Metadata } from "next";
import Link from "next/link";
import { About } from "@/components/about";
import { ContactSection } from "@/components/contact-section";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { ProjectGrid } from "@/components/project-grid";
import { Section } from "@/components/section";
import { Timeline } from "@/components/timeline";
import { education } from "@/content/education";
import { experience } from "@/content/experience";
import { featuredProjects, projects } from "@/content/projects/_meta";

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
        eyebrow="Selected work"
        title="Things I've built"
        action={
          hasMoreProjects ? (
            <Link
              href="/projects"
              className="link-underline text-muted hover:text-fg text-sm transition-colors"
            >
              All projects →
            </Link>
          ) : undefined
        }
      >
        <ProjectGrid projects={featuredProjects} />
      </Section>

      <Section id="about" eyebrow="About" title="A bit about me">
        <About />
      </Section>

      <Section id="experience" eyebrow="Experience" title="Where I've worked">
        <Timeline entries={experience} />
      </Section>

      <Section id="education" eyebrow="Education" title="How I got here">
        <Timeline entries={education} />
      </Section>

      <ContactSection />
    </>
  );
}
