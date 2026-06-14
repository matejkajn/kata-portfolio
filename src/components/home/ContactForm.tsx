"use client";

import { Button } from "@/components/ui/Button";
import { useContactForm } from "@/hooks/useContactForm";
import type { ContactFormValues } from "@/hooks/useContactForm";

const FIELDS: Array<{
  name: keyof ContactFormValues;
  label: string;
  type: string;
  required?: boolean;
}> = [
  { name: "name", label: "Jméno a Příjmení", type: "text", required: true },
  { name: "email", label: "E-mail", type: "email", required: true },
  { name: "phone", label: "Telefon", type: "tel" },
];

const inputClass =
  "w-full rounded-lg border border-white/25 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-accent focus:outline-none";

/** Controlled contact form. State/logic live in `useContactForm`. */
export function ContactForm() {
  const { values, status, setField, handleSubmit } = useContactForm();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {FIELDS.map((field) => (
        <input
          key={field.name}
          type={field.type}
          required={field.required}
          placeholder={field.label}
          aria-label={field.label}
          value={values[field.name]}
          onChange={(e) => setField(field.name, e.target.value)}
          className={inputClass}
        />
      ))}

      <textarea
        required
        rows={4}
        placeholder="Zpráva"
        aria-label="Zpráva"
        value={values.message}
        onChange={(e) => setField("message", e.target.value)}
        className={inputClass}
      />

      <div className="flex items-center gap-4">
        <Button
          type="submit"
          variant="accent"
          disabled={status === "submitting"}
          className="disabled:opacity-60"
        >
          {status === "submitting" ? "Odesílám…" : "Odeslat"}
        </Button>
        {status === "success" && (
          <span className="text-sm text-white/80" role="status">
            Děkuji, ozvu se vám co nejdříve.
          </span>
        )}
        {status === "error" && (
          <span className="text-sm text-accent" role="alert">
            Něco se pokazilo, zkuste to prosím znovu.
          </span>
        )}
      </div>
    </form>
  );
}
