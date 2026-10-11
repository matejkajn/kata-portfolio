"use client";

import { ActionMessage } from "./ActionMessage";
import { AdminButton } from "./AdminButton";
import { useActionRunner } from "@/hooks/useActionRunner";
import type { ActionResult } from "@/lib/admin/result";
import type { MoveDirection } from "@/lib/admin/rows";

interface RowActionsProps {
  /** Reorder handler; omit to hide the arrows. */
  onMove?: (direction: MoveDirection) => Promise<ActionResult>;
  isFirst?: boolean;
  isLast?: boolean;
  onDelete?: () => Promise<ActionResult>;
  /** Confirmation prompt shown before deleting. */
  deleteConfirm?: string;
  deleteLabel?: string;
}

/** Up / down / delete buttons for an item in an ordered list. */
export function RowActions({
  onMove,
  isFirst = false,
  isLast = false,
  onDelete,
  deleteConfirm = "Opravdu smazat?",
  deleteLabel = "Smazat",
}: RowActionsProps) {
  const { run, pending, result } = useActionRunner();

  return (
    <div className="flex items-center gap-1.5">
      {result.status === "error" && <ActionMessage result={result} className="mr-2" />}
      {onMove && (
        <>
          <AdminButton
            size="sm"
            variant="ghost"
            aria-label="Posunout nahoru"
            title="Posunout nahoru"
            disabled={pending || isFirst}
            onClick={() => run(() => onMove("up"))}
          >
            ↑
          </AdminButton>
          <AdminButton
            size="sm"
            variant="ghost"
            aria-label="Posunout dolů"
            title="Posunout dolů"
            disabled={pending || isLast}
            onClick={() => run(() => onMove("down"))}
          >
            ↓
          </AdminButton>
        </>
      )}
      {onDelete && (
        <AdminButton
          size="sm"
          variant="danger"
          disabled={pending}
          onClick={() => run(onDelete, deleteConfirm)}
        >
          {deleteLabel}
        </AdminButton>
      )}
    </div>
  );
}
