import "server-only";

import { revalidatePath } from "next/cache";

/**
 * Purge every statically rendered public page after an admin edit. The site is
 * small, so invalidating the whole tree is simpler and safer than tracking
 * which pages show which content.
 */
export function revalidateSite(): void {
  revalidatePath("/", "layout");
}
