import { AdminButton } from "./AdminButton";
import { AuthCard } from "./AuthCard";
import { signOut } from "@/lib/admin/actions/session";

interface AccessDeniedProps {
  email: string | null;
}

/** Shown to a signed-in Google account that isn't on the admin allowlist. */
export function AccessDenied({ email }: AccessDeniedProps) {
  return (
    <AuthCard title="Přístup odepřen">
      <p className="text-sm text-muted">
        Účet <strong className="text-ink">{email ?? "bez e-mailu"}</strong> nemá
        přístup do administrace.
      </p>
      <form action={signOut} className="w-full">
        <AdminButton type="submit" className="w-full">
          Odhlásit a zkusit jiný účet
        </AdminButton>
      </form>
    </AuthCard>
  );
}
