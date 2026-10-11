"use server";

import { requireAdmin } from "../auth";
import { readOptionalString, readRequired } from "../formData";
import { failure, success, throwIfError, type ActionResult } from "../result";
import { revalidateSite } from "../revalidate";
import { moveRow, nextSortOrder, type MoveDirection } from "../rows";
import type { ProjectImage } from "@/types";

/** Append already-uploaded images to the end of a project's gallery. */
export async function addProjectImages(
  projectId: string,
  images: ProjectImage[],
): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();
    const scope = { column: "project_id", value: projectId } as const;
    const start = await nextSortOrder(supabase, "project_images", scope);

    const { error } = await supabase.from("project_images").insert(
      images.map((image, index) => ({
        project_id: projectId,
        url: image.url,
        alt: image.alt || null,
        sort_order: start + index,
      })),
    );
    throwIfError(error);

    revalidateSite();
    return success(images.length === 1 ? "Obrázek přidán." : `Přidáno ${images.length} obrázků.`);
  } catch (error) {
    return failure(error);
  }
}

/** Update an image's URL / alt text from its form. */
export async function saveProjectImage(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();
    const id = readRequired(formData, "id", "id");
    const { error } = await supabase
      .from("project_images")
      .update({
        url: readRequired(formData, "url", "Obrázek"),
        alt: readOptionalString(formData, "alt"),
      })
      .eq("id", id);
    throwIfError(error);
    revalidateSite();
    return success("Obrázek uložen.");
  } catch (error) {
    return failure(error);
  }
}

export async function deleteProjectImage(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();
    const { error } = await supabase.from("project_images").delete().eq("id", id);
    throwIfError(error);
    revalidateSite();
    return success("Obrázek odebrán.");
  } catch (error) {
    return failure(error);
  }
}

export async function moveProjectImage(
  id: string,
  projectId: string,
  direction: MoveDirection,
): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();
    await moveRow(supabase, "project_images", id, direction, {
      column: "project_id",
      value: projectId,
    });
    revalidateSite();
    return success("Pořadí změněno.");
  } catch (error) {
    return failure(error);
  }
}

/** Use a gallery image as the project's cover in the portfolio grid. */
export async function setProjectThumbnail(projectId: string, url: string): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();
    const { error } = await supabase
      .from("projects")
      .update({ thumbnail_url: url.trim() || null })
      .eq("id", projectId);
    throwIfError(error);
    revalidateSite();
    return success("Náhledový obrázek nastaven.");
  } catch (error) {
    return failure(error);
  }
}
