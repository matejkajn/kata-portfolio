import { useId } from "react";

import { Field } from "./Field";
import { cn } from "@/lib/cn";
import { INPUT_CLASS } from "@/lib/admin/styles";
import { isHexColor } from "@/lib/theme";

interface ColorInputProps {
  label: string;
  hint?: string;
  value: string;
  /** Shown as a "reset" action when the value differs from it. */
  defaultValue?: string;
  onChange: (value: string) => void;
}

/** Colour picker paired with an editable hex field (`#rrggbb`). */
export function ColorInput({ label, hint, value, defaultValue, onChange }: ColorInputProps) {
  const inputId = useId();
  const canReset = defaultValue !== undefined && value.toLowerCase() !== defaultValue.toLowerCase();

  return (
    <Field label={label} htmlFor={inputId} hint={hint}>
      <div className="flex items-center gap-3">
        <input
          type="color"
          aria-label={`${label} — výběr barvy`}
          // The native picker needs a valid colour even while the hex is being typed.
          value={isHexColor(value) ? value.toLowerCase() : "#000000"}
          onChange={(event) => onChange(event.target.value)}
          className="h-10 w-14 shrink-0 cursor-pointer rounded-lg border border-line bg-white p-1"
        />
        <input
          id={inputId}
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value.trim())}
          pattern="#[0-9a-fA-F]{6}"
          title="Barva ve tvaru #rrggbb, např. #300713"
          maxLength={7}
          spellCheck={false}
          required
          className={cn(INPUT_CLASS, "w-28 font-mono uppercase")}
        />
        {canReset && (
          <button
            type="button"
            onClick={() => onChange(defaultValue)}
            className="text-xs text-muted underline-offset-2 hover:text-ink hover:underline"
          >
            Výchozí
          </button>
        )}
      </div>
    </Field>
  );
}
