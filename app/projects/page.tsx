import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
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
      <PageHeader
        eyebrow="Work"
        title="Projects, with the thinking behind them"
        lead="Each one has a short case study covering the problem, what I built and what I'd do differently next time."
      />

      <ProjectGrid projects={projects} />
    </div>
  );
}
