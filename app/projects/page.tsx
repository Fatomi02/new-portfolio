import type { Metadata } from "next";
import { ProjectGrid } from "@/components/project-grid";
import { projects } from "@/content/projects/_meta";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects, with a write-up of how each one was built.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="container-page pt-16 sm:pt-24">
      <header className="mb-14 sm:mb-20">
        <p className="eyebrow mb-3">Work</p>
        <h1 className="font-display text-h1 max-w-[16ch]">
          Projects, with the thinking behind them
        </h1>
        <p className="text-muted text-lead mt-6 max-w-[52ch]">
          Each one has a short case study covering the problem, what I built
          and what I&rsquo;d do differently next time.
        </p>
      </header>

      <ProjectGrid projects={projects} />
    </div>
  );
}
