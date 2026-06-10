import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

/** A single portfolio project: cover image, title and work tags. */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/portfolio/${project.slug}`} className="group flex flex-col gap-3">
      <ImagePlaceholder
        label={project.title}
        color={project.imageColor}
        className="aspect-[4/3] w-full rounded-2xl transition-transform duration-300 group-hover:-translate-y-1"
      />
      <div>
        <h3 className="text-lg font-semibold text-ink">{project.title}</h3>
        <p className="text-sm text-muted">{project.tags}</p>
      </div>
    </Link>
  );
}
