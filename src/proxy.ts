import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { isAuthBypassed } from "@/lib/admin/preview";
import { getSupabaseEnv } from "@/lib/supabase/env";
import type { Database } from "@/types/database";

const LOGIN_PATH = "/admin/login";

/**
 * Guards the administration: refreshes the Supabase session cookie on every
 * admin request and sends signed-out visitors to the login page. Whether the
 * signed-in account is actually an admin is checked by the admin layout and
 * enforced again by row level security on every write.
 */
export async function proxy(request: NextRequest) {
  if (isAuthBypassed()) return NextResponse.next({ request });

  let response = NextResponse.next({ request });
  const { url, anonKey } = getSupabaseEnv();

  const supabase = createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet, headers) => {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
        for (const [key, value] of Object.entries(headers)) {
          response.headers.set(key, value);
        }
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoginPage = request.nextUrl.pathname === LOGIN_PATH;
  if (!user && !isLoginPage) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
