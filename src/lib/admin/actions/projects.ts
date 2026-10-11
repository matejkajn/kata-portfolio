"use server";

import { redirect } from "next/navigation";

import { requireAdmin } from "../auth";
import { readOptionalInt, readOptionalString, readRequired, readString } from "../formData";
import { failure, success, throwIfError, type ActionResult } from "../result";
import { revalidateSite } from "../revalidate";
import { moveRow, nextSortOrder, type MoveDirection } from "../rows";
import { slugify } from "@/lib/text";

/** "logotvorba, vizuální identita" → ["logotvorba", "vizuální identita"]. */
function parseTags(value: string): string[] {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

/**
 * Create (no `id`) or update a project. A new project redirects to its edit
 * page so images can be added straight away.
 */
export async function saveProject(formData: FormData): Promise<ActionResult> {
  const id = readOptionalString(formData, "id");
  let createdId: string | null = null;

  try {
    const supabase = await requireAdmin();
    const title = readRequired(formData, "title", "Název");
    const slug = slugify(readString(formData, "slug") || title);
    if (!slug) throw new Error("Zadejte platnou URL adresu projektu.");

    const fields = {
      title,
      slug,
      tags: parseTags(readString(formData, "tags")),
      description: readOptionalString(formData, "description"),
      thumbnail_url: readOptionalString(formData, "thumbnail_url"),
    };
    const sortOrder = readOptionalInt(formData, "sort_order");

    if (id) {
      const { error } = await supabase
        .from("projects")
        .update(sortOrder === null ? fields : { ...fields, sort_order: sortOrder })
        .eq("id", id);
      throwIfError(error);
    } else {
      const { data, error } = await supabase
        .from("projects")
        .insert({ ...fields, sort_order: sortOrder ?? (await nextSortOrder(supabase, "projects")) })
        .select("id")
        .single();
      throwIfError(error);
      createdId = data?.id ?? null;
    }

    revalidateSite();
  } catch (error) {
    return failure(error);
  }

  // `redirect` throws, so it must run outside the try/catch.
  if (createdId) redirect(`/admin/projects/${createdId}`);
  return success("Projekt uložen.");
}

export async function deleteProject(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();
    const { error } = await supabase.from("projects").delete().eq("id", id);
    throwIfError(error);
    revalidateSite();
  } catch (error) {
    return failure(error);
  }
  redirect("/admin");
}

export async function moveProject(id: string, direction: MoveDirection): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();
    await moveRow(supabase, "projects", id, direction);
    revalidateSite();
    return success("Pořadí změněno.");
  } catch (error) {
    return failure(error);
  }
}
