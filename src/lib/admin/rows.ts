import "server-only";

import { throwIfError } from "./result";
import type { createServerSupabase } from "@/lib/supabase/server";

type ServerSupabase = Awaited<ReturnType<typeof createServerSupabase>>;

/** Tables whose rows are ordered by an integer `sort_order` column. */
export type SortableTable = "projects" | "process_steps" | "testimonials" | "project_images";

export type MoveDirection = "up" | "down";

/** Optional grouping column, e.g. images are ordered within one project. */
interface Scope {
  column: "project_id";
  value: string;
}

interface SortableRow {
  id: string;
  sort_order: number;
}

/** Ordered `id, sort_order` pairs of a table (optionally within a scope). */
async function listOrder(
  supabase: ServerSupabase,
  table: SortableTable,
  scope?: Scope,
): Promise<SortableRow[]> {
  // Every sortable table shares the selected columns, so treat them alike.
  let query = supabase
    .from(table as "process_steps")
    .select("id, sort_order")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });
  if (scope) query = query.eq(scope.column as "id", scope.value);

  const { data, error } = await query;
  throwIfError(error);
  return data ?? [];
}

/** The `sort_order` that places a new row last. */
export async function nextSortOrder(
  supabase: ServerSupabase,
  table: SortableTable,
  scope?: Scope,
): Promise<number> {
  const rows = await listOrder(supabase, table, scope);
  return rows.reduce((max, row) => Math.max(max, row.sort_order), 0) + 1;
}

/**
 * Swap a row with its neighbour, then renumber the whole list 1…n so gaps and
 * duplicate `sort_order` values left by manual edits are cleaned up.
 */
export async function moveRow(
  supabase: ServerSupabase,
  table: SortableTable,
  id: string,
  direction: MoveDirection,
  scope?: Scope,
): Promise<void> {
  const rows = await listOrder(supabase, table, scope);
  const index = rows.findIndex((row) => row.id === id);
  const target = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || target < 0 || target >= rows.length) return;

  [rows[index], rows[target]] = [rows[target], rows[index]];

  const updates = rows
    .map((row, position) => ({ id: row.id, sort_order: position + 1, previous: row.sort_order }))
    .filter((row) => row.sort_order !== row.previous)
    .map((row) =>
      supabase
        .from(table as "process_steps")
        .update({ sort_order: row.sort_order })
        .eq("id", row.id),
    );

  const results = await Promise.all(updates);
  for (const { error } of results) throwIfError(error);
}
