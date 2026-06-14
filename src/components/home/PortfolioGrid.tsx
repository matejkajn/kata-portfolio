"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { Project } from "@/types";
import { ProjectCard } from "./ProjectCard";

interface PortfolioGridProps {
  projects: Project[];
  /** How many projects to show before the "Zobrazit více" button is clicked. */
  initialCount?: number;
}

/** Project grid that reveals the remaining previews on demand. */
export function PortfolioGrid({
  projects,
  initialCount = 4,
}: PortfolioGridProps) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? projects : projects.slice(0, initialCount);
  const hasMore = projects.length > initialCount;

  return (
    <>
      <div className="mt-12 grid grid-cols-2 gap-6 md:gap-8">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {hasMore && !expanded && (
        <div className="mt-12 flex justify-center">
          <Button onClick={() => setExpanded(true)}>Zobrazit více</Button>
        </div>
      )}
    </>
  );
}
