import type { ReactNode } from "react";

import { ActionMessage } from "./ActionMessage";
import { AdminButton } from "./AdminButton";
import type { ActionResult } from "@/lib/admin/result";

interface FormFooterProps {
  pending: boolean;
  result: ActionResult;
  submitLabel?: string;
  /** Extra controls to the right of the status message (move / delete…). */
  children?: ReactNode;
}

/** Submit button, status message and optional extra actions for a form. */
export function FormFooter({
  pending,
  result,
  submitLabel = "Uložit",
  children,
}: FormFooterProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <AdminButton type="submit" variant="primary" disabled={pending}>
        {pending ? "Ukládám…" : submitLabel}
      </AdminButton>
      <ActionMessage result={result} />
      {children && <div className="ml-auto flex items-center gap-2">{children}</div>}
    </div>
  );
}
