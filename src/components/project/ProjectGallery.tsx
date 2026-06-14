import type { ProjectImage } from "@/types";
import { ProjectImageBlock } from "./ProjectImageBlock";

interface ProjectGalleryProps {
  images: ProjectImage[];
}

/** Stacked, full-width case-study body images, ordered for display. */
export function ProjectGallery({ images }: ProjectGalleryProps) {
  if (images.length === 0) return null;

  return (
    <div className="flex flex-col gap-12 md:gap-16">
      {images.map((image) => (
        <ProjectImageBlock key={image.url} image={image} />
      ))}
    </div>
  );
}
