/** Typed readers for `FormData` posted by the admin forms. */

/** Trimmed string value; empty string when absent. */
export function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/** Trimmed string, or `null` when empty (for nullable columns). */
export function readOptionalString(formData: FormData, key: string): string | null {
  return readString(formData, key) || null;
}

/** Integer value, or `null` when empty / not a number. */
export function readOptionalInt(formData: FormData, key: string): number | null {
  const parsed = Number.parseInt(readString(formData, key), 10);
  return Number.isFinite(parsed) ? parsed : null;
}

/** Required non-empty string; throws a user-facing error otherwise. */
export function readRequired(formData: FormData, key: string, label: string): string {
  const value = readString(formData, key);
  if (!value) throw new Error(`Pole „${label}“ je povinné.`);
  return value;
}
