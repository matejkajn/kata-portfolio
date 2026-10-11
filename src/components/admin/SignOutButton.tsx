import { signOut } from "@/lib/admin/actions/session";

/** Posts to the sign-out Server Action. */
export function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="text-xs font-medium text-white/60 underline-offset-2 hover:text-white hover:underline"
      >
        Odhlásit se
      </button>
    </form>
  );
}
