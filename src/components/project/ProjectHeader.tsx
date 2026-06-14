import type { ProjectImage } from "@/types";
import { ProjectImageBlock } from "./ProjectImageBlock";

interface ProjectHeaderProps {
  title: string;
  /** Lead/hero image; omitted when the project has no images yet. */
  hero?: ProjectImage;
}

/** Case-study title followed by the full-width hero image. */
export function ProjectHeader({ title, hero }: ProjectHeaderProps) {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
        {title}
      </h1>
      {hero && <ProjectImageBlock image={hero} priority />}
    </div>
  );
}
