/**
 * Local preview of the administration without signing in.
 *
 * Enabled only when `ADMIN_AUTH_BYPASS=true` *and* running `next dev`, so it
 * can never switch on in a production build. Writes still go through RLS
 * with no session, so the preview is read-only.
 */
export function isAuthBypassed(): boolean {
  return (
    process.env.NODE_ENV === "development" &&
    process.env.ADMIN_AUTH_BYPASS === "true"
  );
}

export const PREVIEW_EMAIL = "náhled bez přihlášení";
