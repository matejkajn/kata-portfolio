"use client";

import { AdminButton } from "./AdminButton";
import { useGoogleSignIn } from "@/hooks/useGoogleSignIn";

/** "Přihlásit přes Google" — starts the Supabase OAuth flow. */
export function GoogleSignInButton() {
  const { signIn, pending, error } = useGoogleSignIn();

  return (
    <div className="flex w-full flex-col gap-3">
      <AdminButton
        variant="primary"
        className="w-full py-2.5"
        disabled={pending}
        onClick={signIn}
      >
        {pending ? "Přesměrovávám…" : "Přihlásit se přes Google"}
      </AdminButton>
      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
