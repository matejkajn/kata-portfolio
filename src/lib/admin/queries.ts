import "server-only";

import { throwIfError } from "./result";
import { createServerSupabase } from "@/lib/supabase/server";
import type {
  ProcessStepRow,
  ProjectImageRow,
  ProjectRow,
  TestimonialRow,
} from "@/types/database";

/** Read helpers for the administration — raw rows, ids included. */

/** PostgREST code for a table that doesn't exist (migration not run yet). */
const MISSING_TABLE = "PGRST205";

function assertTable(error: { code?: string; message: string } | null): void {
  if (error?.code === MISSING_TABLE) {
    throw new Error(
      "Tabulka v databázi zatím neexistuje. Spusťte supabase/migrations/0002_admin.sql (viz docs/admin-setup.md).",
    );
  }
  throwIfError(error);
}

export type ProjectSummary = Pick<ProjectRow, "id" | "title" | "slug" | "sort_order">;

export interface ProjectWithImages {
  project: ProjectRow;
  images: ProjectImageRow[];
}

/** Projects for the sidebar, in display order. */
export async function listProjects(): Promise<ProjectSummary[]> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("projects")
    .select("id, title, slug, sort_order")
    .order("sort_order", { ascending: true });
  throwIfError(error);
  return data ?? [];
}

/** One project with its gallery, or `null` for an unknown id. */
export async function getProject(id: string): Promise<ProjectWithImages | null> {
  const supabase = await createServerSupabase();
  const [projectResult, imagesResult] = await Promise.all([
    supabase.from("projects").select("*").eq("id", id).maybeSingle(),
    supabase
      .from("project_images")
      .select("*")
      .eq("project_id", id)
      .order("sort_order", { ascending: true }),
  ]);

  // An id that isn't a valid uuid surfaces as error 22P02 — treat as missing.
  if (projectResult.error?.code === "22P02") return null;
  throwIfError(projectResult.error);
  throwIfError(imagesResult.error);

  if (!projectResult.data) return null;
  return { project: projectResult.data, images: imagesResult.data ?? [] };
}

export async function listProcessSteps(): Promise<ProcessStepRow[]> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("process_steps")
    .select("*")
    .order("sort_order", { ascending: true });
  assertTable(error);
  return data ?? [];
}

export async function listTestimonials(): Promise<TestimonialRow[]> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });
  assertTable(error);
  return data ?? [];
}
