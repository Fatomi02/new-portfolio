import type { ProjectMeta } from "@/lib/content-types";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";

interface ProjectGridProps {
  projects: ProjectMeta[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
      {projects.map((project, index) => (
        <Reveal key={project.slug} delay={(index % 2) * 0.08}>
          <ProjectCard project={project} priority={index === 0} />
        </Reveal>
      ))}
    </div>
  );
}
