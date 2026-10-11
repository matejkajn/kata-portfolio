import { useId, type ComponentPropsWithoutRef } from "react";

import { Field } from "./Field";
import { cn } from "@/lib/cn";
import { INPUT_CLASS } from "@/lib/admin/styles";

interface TextAreaProps extends ComponentPropsWithoutRef<"textarea"> {
  label: string;
  hint?: string;
}

/** Labelled multi-line input that can be resized vertically. */
export function TextArea({ label, hint, id, rows = 4, className, ...props }: TextAreaProps) {
  const fallbackId = useId();
  const inputId = id ?? fallbackId;

  return (
    <Field label={label} htmlFor={inputId} hint={hint}>
      <textarea
        id={inputId}
        rows={rows}
        className={cn(INPUT_CLASS, "resize-y leading-relaxed", className)}
        {...props}
      />
    </Field>
  );
}
