import { ButtonLink } from "@/components/ui/Button";
import type { Project } from "@/types";
import { ProjectCard } from "./ProjectCard";

interface PortfolioGridProps {
  projects: Project[];
  /** When set, renders a "Zobrazit více" link to the full listing below the grid. */
  moreHref?: string;
  moreLabel?: string;
}

/** Project previews — one per row on mobile, two columns from md up, optionally followed by a link to the full listing. */
export function PortfolioGrid({
  projects,
  moreHref,
  moreLabel = "Zobrazit více",
}: PortfolioGridProps) {
  return (
    <>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {moreHref && (
        <div className="mt-12 flex justify-center">
          <ButtonLink href={moreHref} size="lg">
            {moreLabel}
          </ButtonLink>
        </div>
      )}
    </>
  );
}
