import { cache } from "react";

import { supabase } from "./client";
import { PROCESS_STEPS } from "@/lib/content/process";
import { REFERENCES } from "@/lib/content/references";
import { normalizeSiteSettings } from "@/lib/content/siteSettings";
import type { ProcessStepRow, TestimonialRow } from "@/types/database";
import type { ProcessStep, Reference, SiteSettings } from "@/types";

/**
 * Data layer for the editable site copy. Each reader falls back to the
 * built-in defaults in `src/lib/content` when the query fails (e.g. the
 * migration hasn't been run yet), so the public site never breaks. An empty
 * table is respected — that is the admin deliberately removing everything.
 */

function warn(what: string, message: string): void {
  console.warn(`[content] Using defaults for ${what}: ${message}`);
}

/** Map a `process_steps` row onto the domain shape. */
export function toProcessStep(row: ProcessStepRow): ProcessStep {
  return { id: row.id, label: row.label, description: row.description };
}

/** Map a `testimonials` row onto the domain shape. */
export function toReference(row: TestimonialRow): Reference {
  return {
    id: row.id,
    quote: row.quote,
    author: row.author,
    role: row.role,
    logoUrl: row.logo_url ?? undefined,
    logoWidth: row.logo_width ?? undefined,
    logoHeight: row.logo_height ?? undefined,
  };
}

/** Site-wide copy. Memoised per request — the layout and pages share one read. */
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const { data, error } = await supabase
    .from("site_settings")
    .select("content")
    .eq("id", 1)
    .maybeSingle();

  if (error) warn("site settings", error.message);
  return normalizeSiteSettings(data?.content);
});

/** Creative-process timeline, ordered for display. */
export async function getProcessSteps(): Promise<ProcessStep[]> {
  const { data, error } = await supabase
    .from("process_steps")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    warn("process steps", error.message);
    return PROCESS_STEPS;
  }
  return data.map(toProcessStep);
}

/** Client testimonials, ordered for display. */
export async function getReferences(): Promise<Reference[]> {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    warn("references", error.message);
    return REFERENCES;
  }
  return data.map(toReference);
}
