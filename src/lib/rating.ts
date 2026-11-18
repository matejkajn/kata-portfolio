/** Highest star rating a reference can have. */
export const MAX_RATING = 5;

/** Keep a star rating within 1–5, defaulting to the maximum when missing. */
export function clampRating(value: number | null | undefined): number {
  return Math.min(MAX_RATING, Math.max(1, Math.round(value ?? MAX_RATING)));
}
