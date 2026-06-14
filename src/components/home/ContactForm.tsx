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
  "w-full border-0 border-b border-white/30 bg-transparent px-0 py-2 text-base text-white placeholder:text-white/55 focus:border-accent focus:outline-none focus:ring-0";

/** Controlled contact form. State/logic live in `useContactForm`. */
export function ContactForm() {
  const { values, status, setField, handleSubmit } = useContactForm();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7">
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
        rows={2}
        placeholder="Zpráva"
        aria-label="Zpráva"
        value={values.message}
        onChange={(e) => setField("message", e.target.value)}
        className={`${inputClass} resize-none`}
      />

      <div className="mt-2 flex items-center gap-4">
        <Button
          type="submit"
          variant="accent"
          disabled={status === "submitting"}
          className="px-10 py-3 text-base font-semibold disabled:opacity-60"
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
