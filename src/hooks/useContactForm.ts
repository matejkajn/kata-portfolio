"use client";

import { useCallback, useState } from "react";

export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type Status = "idle" | "submitting" | "success" | "error";

const EMPTY: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

interface UseContactForm {
  values: ContactFormValues;
  status: Status;
  setField: (field: keyof ContactFormValues, value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

/**
 * Controlled state and submission handling for the contact form.
 *
 * Submission is a local stub for Iteration 1 — it will be wired to Supabase /
 * an email endpoint later. Presentation stays in the component.
 */
export function useContactForm(): UseContactForm {
  const [values, setValues] = useState<ContactFormValues>(EMPTY);
  const [status, setStatus] = useState<Status>("idle");

  const setField = useCallback(
    (field: keyof ContactFormValues, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setStatus("submitting");
      try {
        // TODO: send `values` to the backend (Supabase / email) once available.
        await new Promise((resolve) => setTimeout(resolve, 600));
        setStatus("success");
        setValues(EMPTY);
      } catch {
        setStatus("error");
      }
    },
    [],
  );

  return { values, status, setField, handleSubmit };
}
