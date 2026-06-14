import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/types/database";

/**
 * Shared Supabase client for the public site.
 *
 * Iteration 1 only reads content (guarded by the public read RLS policies),
 * so the anonymous key is all that's needed and it is safe to expose to the
 * browser. The service-role key must never live here — admin writes in
 * Iteration 2 will use it on the server only.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and " +
      "NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local (see .env.example).",
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
