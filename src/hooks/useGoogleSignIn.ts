"use client";

import { useCallback, useState } from "react";

import { createBrowserSupabase } from "@/lib/supabase/browser";

interface UseGoogleSignIn {
  signIn: () => Promise<void>;
  pending: boolean;
  error: string | null;
}

/**
 * Starts the Supabase Google OAuth flow. Google redirects back to
 * `/auth/callback`, which exchanges the code for a session cookie.
 */
export function useGoogleSignIn(next = "/admin"): UseGoogleSignIn {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = useCallback(async () => {
    setPending(true);
    setError(null);

    const redirectTo = new URL("/auth/callback", window.location.origin);
    redirectTo.searchParams.set("next", next);

    const { error: signInError } = await createBrowserSupabase().auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: redirectTo.toString() },
    });

    // On success the browser is already navigating to Google.
    if (signInError) {
      setError(signInError.message);
      setPending(false);
    }
  }, [next]);

  return { signIn, pending, error };
}
