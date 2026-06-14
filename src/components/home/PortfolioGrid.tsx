import { ButtonLink } from "@/components/ui/Button";
import type { Project } from "@/types";
import { ProjectCard } from "./ProjectCard";

interface PortfolioGridProps {
  projects: Project[];
  /** When set, renders a "Zobrazit více" link to the full listing below the grid. */
  moreHref?: string;
}

/** Two-column grid of project previews, optionally followed by a link to the full listing. */
export function PortfolioGrid({ projects, moreHref }: PortfolioGridProps) {
  return (
    <>
      <div className="mt-12 grid grid-cols-2 gap-6 md:gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {moreHref && (
        <div className="mt-12 flex justify-center">
          <ButtonLink href={moreHref}>Zobrazit více</ButtonLink>
        </div>
      )}
    </>
  );
}
