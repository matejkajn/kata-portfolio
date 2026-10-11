"use server";

import { requireAdmin } from "../auth";
import { failure, success, throwIfError, type ActionResult } from "../result";
import { revalidateSite } from "../revalidate";
import { normalizeSiteSettings } from "@/lib/content/siteSettings";
import type { Json } from "@/types/database";
import type { SiteSettings } from "@/types";

/** Persist the whole site-settings document. */
export async function saveSiteSettings(settings: SiteSettings): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();
    const content = normalizeSiteSettings(settings) as unknown as Json;
    const { error } = await supabase
      .from("site_settings")
      .upsert({ id: 1, content, updated_at: new Date().toISOString() });
    throwIfError(error);
    revalidateSite();
    return success("Nastavení webu bylo uloženo.");
  } catch (error) {
    return failure(error);
  }
}
