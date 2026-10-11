import type { ReactNode } from "react";

interface FieldProps {
  label: string;
  htmlFor?: string;
  hint?: string;
  children: ReactNode;
}

/** Label + control + optional hint, stacked. */
export function Field({ label, htmlFor, hint, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-muted">{hint}</p>}
    </div>
  );
}
