"use server";

import { requireAdmin } from "../auth";
import { readOptionalString, readRequired, readString } from "../formData";
import { failure, success, throwIfError, type ActionResult } from "../result";
import { revalidateSite } from "../revalidate";
import { moveRow, nextSortOrder, type MoveDirection } from "../rows";

/** Create (no `id`) or update a process step from its form. */
export async function saveProcessStep(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();
    const id = readOptionalString(formData, "id");
    const fields = {
      label: readRequired(formData, "label", "Název kroku"),
      description: readString(formData, "description"),
    };

    const { error } = id
      ? await supabase.from("process_steps").update(fields).eq("id", id)
      : await supabase.from("process_steps").insert({
          ...fields,
          sort_order: await nextSortOrder(supabase, "process_steps"),
        });
    throwIfError(error);

    revalidateSite();
    return success(id ? "Krok uložen." : "Krok přidán.");
  } catch (error) {
    return failure(error);
  }
}

export async function deleteProcessStep(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();
    const { error } = await supabase.from("process_steps").delete().eq("id", id);
    throwIfError(error);
    revalidateSite();
    return success("Krok smazán.");
  } catch (error) {
    return failure(error);
  }
}

export async function moveProcessStep(
  id: string,
  direction: MoveDirection,
): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();
    await moveRow(supabase, "process_steps", id, direction);
    revalidateSite();
    return success("Pořadí změněno.");
  } catch (error) {
    return failure(error);
  }
}
