import { createClient } from "@supabase/supabase-js";

import { getSupabaseEnv } from "./env";
import type { Database } from "@/types/database";

/**
 * Shared, session-less Supabase client for the public site.
 *
 * It only reads content (guarded by the public read RLS policies), so the
 * anonymous key is all that's needed. Admin writes go through the
 * cookie-aware clients in `./server` and `./browser`, which carry the signed-in
 * user's session; the service-role key is never used.
 */
const { url, anonKey } = getSupabaseEnv();

export const supabase = createClient<Database>(url, anonKey);
