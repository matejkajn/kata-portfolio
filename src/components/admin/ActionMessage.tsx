import { cn } from "@/lib/cn";
import type { ActionResult } from "@/lib/admin/result";

interface ActionMessageProps {
  result: ActionResult;
  className?: string;
}

/** Inline success / error feedback for the last admin action. */
export function ActionMessage({ result, className }: ActionMessageProps) {
  if (result.status === "idle") return null;

  const isError = result.status === "error";
  return (
    <p
      role={isError ? "alert" : "status"}
      className={cn("text-sm", isError ? "text-red-700" : "text-emerald-700", className)}
    >
      {result.message}
    </p>
  );
}
