import { supabase } from "./client";
import type { ProjectImageRow, ProjectRow } from "@/types/database";
import type { Project, ProjectDetail, ProjectImage } from "@/types";

/**
 * Data layer for portfolio projects: fetches rows from Supabase and maps them
 * onto the presentation shapes the components consume. Keeping the mapping
 * here is what lets the UI ignore the database's snake_case / array columns.
 */

/** Map a `projects` row onto the listing-level domain shape. */
function toProject(row: ProjectRow): Project {
  return {
    slug: row.slug,
    title: row.title,
    // The DB stores tags as an array; the UI renders a comma-separated string.
    tags: row.tags.join(", "),
    imageUrl: row.thumbnail_url ?? undefined,
  };
}

/** Map a `project_images` row onto the domain image shape. */
function toProjectImage(row: ProjectImageRow): ProjectImage {
  return { url: row.url, alt: row.alt ?? "" };
}

/** All projects, ordered for the portfolio grid. */
export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(`Failed to load projects: ${error.message}`);
  }

  return data.map(toProject);
}

/**
 * A single project with its gallery images, or `null` if no project matches
 * the slug. Images come back ordered by their `sort_order`.
 */
export async function getProjectBySlug(slug: string): Promise<ProjectDetail | null> {
  const { data, error } = await supabase
    .from("projects")
    .select("*, project_images(*)")
    .eq("slug", slug)
    .order("sort_order", { referencedTable: "project_images", ascending: true })
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load project "${slug}": ${error.message}`);
  }

  if (!data) {
    return null;
  }

  // The minimal `Database` generic doesn't model table relationships, so the
  // nested embed isn't inferred — assert the shape we selected.
  const { project_images, ...row } = data as ProjectRow & {
    project_images: ProjectImageRow[];
  };
  return {
    ...toProject(row),
    description: row.description,
    images: project_images.map(toProjectImage),
  };
}
