import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { getSupabaseEnv } from "./env";
import type { Database } from "@/types/database";

/**
 * Supabase client bound to the current request's auth cookies, for Server
 * Components, Server Actions and Route Handlers. Create one per request.
 */
export async function createServerSupabase() {
  const cookieStore = await cookies();
  const { url, anonKey } = getSupabaseEnv();

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Called from a Server Component, where cookies are read-only. The
          // proxy refreshes the session, so this is safe to ignore.
        }
      },
    },
  });
}
