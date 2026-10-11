/** Outcome of an admin Server Action, rendered as an inline status message. */
export type ActionResult =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export const IDLE: ActionResult = { status: "idle" };

export function success(message = "Uloženo."): ActionResult {
  return { status: "success", message };
}

export function failure(error: unknown): ActionResult {
  const message = error instanceof Error ? error.message : String(error);
  return { status: "error", message };
}

/** Throw a user-facing error for a failed Supabase call. */
export function throwIfError(error: { code?: string; message: string } | null): void {
  if (!error) return;
  if (error.code === "23505") {
    throw new Error("Tato hodnota už existuje (např. URL adresa projektu musí být jedinečná).");
  }
  if (error.code === "42501") {
    throw new Error("Nemáte oprávnění k této akci.");
  }
  throw new Error(error.message);
}
