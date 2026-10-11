"use server";

import { requireAdmin } from "../auth";
import {
  readOptionalInt,
  readOptionalString,
  readRequired,
  readString,
} from "../formData";
import { failure, success, throwIfError, type ActionResult } from "../result";
import { revalidateSite } from "../revalidate";
import { moveRow, nextSortOrder, type MoveDirection } from "../rows";

/** Create (no `id`) or update a client reference from its form. */
export async function saveTestimonial(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();
    const id = readOptionalString(formData, "id");
    const fields = {
      author: readRequired(formData, "author", "Jméno"),
      role: readString(formData, "role"),
      quote: readString(formData, "quote"),
      logo_url: readOptionalString(formData, "logo_url"),
      logo_width: readOptionalInt(formData, "logo_width"),
      logo_height: readOptionalInt(formData, "logo_height"),
    };

    const { error } = id
      ? await supabase.from("testimonials").update(fields).eq("id", id)
      : await supabase.from("testimonials").insert({
          ...fields,
          sort_order: await nextSortOrder(supabase, "testimonials"),
        });
    throwIfError(error);

    revalidateSite();
    return success(id ? "Reference uložena." : "Reference přidána.");
  } catch (error) {
    return failure(error);
  }
}

export async function deleteTestimonial(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    throwIfError(error);
    revalidateSite();
    return success("Reference smazána.");
  } catch (error) {
    return failure(error);
  }
}

export async function moveTestimonial(
  id: string,
  direction: MoveDirection,
): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();
    await moveRow(supabase, "testimonials", id, direction);
    revalidateSite();
    return success("Pořadí změněno.");
  } catch (error) {
    return failure(error);
  }
}
