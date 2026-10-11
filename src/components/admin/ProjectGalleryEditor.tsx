import { AdminCard } from "./AdminCard";
import { ProjectImageItem } from "./ProjectImageItem";
import { ProjectImageUploader } from "./ProjectImageUploader";
import type { ProjectImageRow, ProjectRow } from "@/types/database";

interface ProjectGalleryEditorProps {
  project: ProjectRow;
  images: ProjectImageRow[];
}

/** The case-study images of a project, in display order. */
export function ProjectGalleryEditor({ project, images }: ProjectGalleryEditorProps) {
  const folder = `projects/${project.slug}`;

  return (
    <AdminCard
      title={`Obrázky projektu (${images.length})`}
      description="První obrázek je hlavní obrázek pod nadpisem, ostatní tvoří galerii pod popisem."
    >
      <div className="flex flex-col gap-4">
        {images.length > 0 && (
          <ol className="flex flex-col gap-4">
            {images.map((image, index) => (
              <ProjectImageItem
                key={image.id}
                image={image}
                index={index}
                total={images.length}
                folder={folder}
                isThumbnail={image.url === project.thumbnail_url}
              />
            ))}
          </ol>
        )}
        <ProjectImageUploader projectId={project.id} folder={folder} />
      </div>
    </AdminCard>
  );
}
