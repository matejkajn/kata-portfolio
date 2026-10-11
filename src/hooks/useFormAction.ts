"use client";

import { useCallback, useState, useTransition, type FormEvent } from "react";

import { IDLE, type ActionResult } from "@/lib/admin/result";

interface Options {
  /** Clear the form after a successful submit (for "add new" forms). */
  resetOnSuccess?: boolean;
}

interface FormAction {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  pending: boolean;
  result: ActionResult;
  /** Use as a `key` on the fields wrapper; it changes when the form resets. */
  resetKey: number;
}

/**
 * Submits a form's `FormData` to a Server Action inside a transition.
 *
 * Used instead of `<form action>` because React resets such forms after every
 * submit — including failed ones, which would throw away the user's input.
 */
export function useFormAction(
  action: (formData: FormData) => Promise<ActionResult>,
  { resetOnSuccess = false }: Options = {},
): FormAction {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult>(IDLE);
  const [resetKey, setResetKey] = useState(0);

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      startTransition(async () => {
        const outcome = await action(formData);
        setResult(outcome);
        if (resetOnSuccess && outcome.status === "success") {
          setResetKey((key) => key + 1);
        }
      });
    },
    [action, resetOnSuccess],
  );

  return { onSubmit, pending, result, resetKey };
}
