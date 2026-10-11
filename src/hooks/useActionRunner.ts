"use client";

import { useCallback, useState, useTransition } from "react";

import { IDLE, type ActionResult } from "@/lib/admin/result";

interface ActionRunner {
  /** Run a Server Action; when `confirmMessage` is set, ask first. */
  run: (action: () => Promise<ActionResult>, confirmMessage?: string) => void;
  pending: boolean;
  result: ActionResult;
}

/**
 * Runs one-off Server Actions triggered by buttons (delete, reorder…) inside a
 * transition, exposing pending state and the last result.
 */
export function useActionRunner(): ActionRunner {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult>(IDLE);

  const run = useCallback(
    (action: () => Promise<ActionResult>, confirmMessage?: string) => {
      if (confirmMessage && !window.confirm(confirmMessage)) return;
      startTransition(async () => {
        setResult(await action());
      });
    },
    [],
  );

  return { run, pending, result };
}
