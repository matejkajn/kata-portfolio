import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectHeader } from "@/components/project/ProjectHeader";
import { ProjectOverview } from "@/components/project/ProjectOverview";
import { ProjectGallery } from "@/components/project/ProjectGallery";
import { ProjectCta } from "@/components/project/ProjectCta";
import { getProjectBySlug, getProjects } from "@/lib/supabase/projects";
import type { ProjectImage } from "@/types";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-render a static page per project at build time. */
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Projekt nenalezen" };
  }

  return {
    title: `${project.title} — Kateřina Hršelová`,
    description: project.description ?? undefined,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // The lead image is the first gallery image, falling back to the thumbnail
  // for projects whose gallery hasn't been populated yet.
  const [hero, ...gallery] = project.images;
  const heroImage: ProjectImage | undefined =
    hero ??
    (project.imageUrl ? { url: project.imageUrl, alt: project.title } : undefined);

  return (
    <>
      <Navbar />
      <main className="flex-1" data-nav-theme="light">
        <article className="mx-auto w-full max-w-6xl px-6 pt-28 sm:px-8 md:pt-36">
          <div className="flex flex-col gap-12 md:gap-16">
            <ProjectHeader title={project.title} hero={heroImage} />
            <ProjectOverview
              tags={project.tags}
              description={project.description}
            />
            <ProjectGallery images={gallery} />
          </div>
        </article>

        <ProjectCta />
      </main>
      <div data-nav-theme="light">
        <Footer />
      </div>
    </>
  );
}
