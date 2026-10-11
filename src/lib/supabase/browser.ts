import { createBrowserClient } from "@supabase/ssr";

import { getSupabaseEnv } from "./env";
import type { Database } from "@/types/database";

/**
 * Supabase client for Client Components in the administration (Google
 * sign-in, direct image uploads to storage). Shares the session cookies set by
 * the server client.
 */
export function createBrowserSupabase() {
  const { url, anonKey } = getSupabaseEnv();
  return createBrowserClient<Database>(url, anonKey);
}
