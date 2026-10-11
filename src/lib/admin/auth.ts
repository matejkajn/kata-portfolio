import "server-only";

import { isAuthBypassed, PREVIEW_EMAIL } from "./preview";
import { createServerSupabase } from "@/lib/supabase/server";

/** Who is looking at the administration. */
export type AdminSession =
  | { status: "anonymous" }
  | { status: "forbidden"; email: string | null }
  | { status: "admin"; email: string; preview: boolean };

type ServerSupabase = Awaited<ReturnType<typeof createServerSupabase>>;

/**
 * Resolve the current visitor against the `admin_users` allowlist (via the
 * `is_admin()` database function, the same check RLS applies to writes).
 */
export async function getAdminSession(): Promise<AdminSession> {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return isAuthBypassed()
      ? { status: "admin", email: PREVIEW_EMAIL, preview: true }
      : { status: "anonymous" };
  }

  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin || !user.email) {
    return { status: "forbidden", email: user.email ?? null };
  }

  return { status: "admin", email: user.email, preview: false };
}

/**
 * Supabase client for an admin write. Throws unless the caller is an admin, so
 * every Server Action fails fast instead of relying on RLS errors alone.
 */
export async function requireAdmin(): Promise<ServerSupabase> {
  const supabase = await createServerSupabase();
  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) {
    throw new Error(
      isAuthBypassed()
        ? "Náhled bez přihlášení — ukládání je vypnuté. Přihlaste se pro úpravy."
        : "Nemáte oprávnění upravovat obsah.",
    );
  }
  return supabase;
}
