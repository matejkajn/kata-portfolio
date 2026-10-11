import { NextResponse, type NextRequest } from "next/server";

import { createServerSupabase } from "@/lib/supabase/server";

/**
 * OAuth redirect target. Google sends the user back here with a one-time
 * `code`, which is exchanged for a session cookie before continuing to the
 * administration.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next");
  // Only allow same-site relative redirects.
  const target = next?.startsWith("/") && !next.startsWith("//") ? next : "/admin";

  if (code) {
    const supabase = await createServerSupabase();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(target, origin));
    }
  }

  return NextResponse.redirect(new URL("/admin/login?error=auth", origin));
}
