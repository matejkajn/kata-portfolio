import { useId, type ComponentPropsWithoutRef } from "react";

import { Field } from "./Field";
import { INPUT_CLASS } from "@/lib/admin/styles";

interface TextInputProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  hint?: string;
}

/** Labelled single-line input. */
export function TextInput({ label, hint, id, ...props }: TextInputProps) {
  const fallbackId = useId();
  const inputId = id ?? fallbackId;

  return (
    <Field label={label} htmlFor={inputId} hint={hint}>
      <input id={inputId} className={INPUT_CLASS} {...props} />
    </Field>
  );
}
