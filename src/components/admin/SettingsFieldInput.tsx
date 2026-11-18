import { ColorInput } from "./ColorInput";
import { ImageField } from "./ImageField";
import { TextArea } from "./TextArea";
import { TextInput } from "./TextInput";
import type { SettingsFieldKind } from "@/lib/admin/settingsSchema";

interface SettingsFieldInputProps {
  label: string;
  kind: SettingsFieldKind;
  hint?: string;
  value: string | number;
  /** Built-in default; colour fields offer a reset to it. */
  defaultValue?: string | number;
  onChange: (value: string) => void;
}

/** Renders the right control for one settings field. */
export function SettingsFieldInput({
  label,
  kind,
  hint,
  value,
  defaultValue,
  onChange,
}: SettingsFieldInputProps) {
  switch (kind) {
    case "color":
      return (
        <ColorInput
          label={label}
          hint={hint}
          value={String(value)}
          defaultValue={defaultValue === undefined ? undefined : String(defaultValue)}
          onChange={onChange}
        />
      );
    case "textarea":
      return (
        <TextArea
          label={label}
          hint={hint}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      );
    case "image":
      return (
        <ImageField
          label={label}
          hint={hint}
          folder="site"
          value={String(value)}
          onChange={onChange}
        />
      );
    default:
      return (
        <TextInput
          label={label}
          hint={hint}
          type={kind}
          min={kind === "number" ? 0 : undefined}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      );
  }
}
