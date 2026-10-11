import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProjectActions } from "@/components/admin/ProjectActions";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { ProjectGalleryEditor } from "@/components/admin/ProjectGalleryEditor";
import { getProject, listProjects } from "@/lib/admin/queries";

interface ProjectAdminPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProjectAdminPageProps): Promise<Metadata> {
  const { id } = await params;
  const result = await getProject(id);
  return { title: result?.project.title ?? "Projekt" };
}

export default async function ProjectAdminPage({ params }: ProjectAdminPageProps) {
  const { id } = await params;
  const [result, projects] = await Promise.all([getProject(id), listProjects()]);
  if (!result) notFound();

  const { project, images } = result;
  const position = projects.findIndex((item) => item.id === project.id);

  return (
    <>
      <AdminPageHeader
        title={project.title}
        description={
          <Link
            href={`/portfolio/${project.slug}`}
            target="_blank"
            className="text-brand hover:underline"
          >
            Zobrazit na webu ↗
          </Link>
        }
        actions={
          <ProjectActions
            id={project.id}
            title={project.title}
            isFirst={position <= 0}
            isLast={position === projects.length - 1}
          />
        }
      />
      <div className="flex flex-col gap-6">
        {/* Keyed so the form remounts with fresh defaults when switching projects. */}
        <ProjectForm key={project.id} project={project} />
        <ProjectGalleryEditor project={project} images={images} />
      </div>
    </>
  );
}
