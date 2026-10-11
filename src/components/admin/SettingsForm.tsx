"use client";

import type { FormEvent } from "react";

import { ActionMessage } from "./ActionMessage";
import { AdminButton } from "./AdminButton";
import { SettingsSectionCard } from "./SettingsSectionCard";
import { useSiteSettingsForm } from "@/hooks/useSiteSettingsForm";
import { SETTINGS_SCHEMA } from "@/lib/admin/settingsSchema";
import type { SiteSettings } from "@/types";

interface SettingsFormProps {
  initial: SiteSettings;
}

/** Every site-wide text and image, saved together as one document. */
export function SettingsForm({ initial }: SettingsFormProps) {
  const { settings, setField, save, isDirty, pending, result } = useSiteSettingsForm(initial);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    save();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {SETTINGS_SCHEMA.map((definition) => (
        <SettingsSectionCard
          key={definition.section}
          definition={definition}
          values={settings[definition.section]}
          onChange={(key, value) => setField(definition.section, key, value)}
        />
      ))}

      {/* Sticky save bar so changes can be saved from anywhere on the page. */}
      <div className="sticky bottom-4 flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-white/95 px-5 py-3 shadow-lg backdrop-blur">
        <AdminButton type="submit" variant="primary" disabled={pending || !isDirty}>
          {pending ? "Ukládám…" : "Uložit změny"}
        </AdminButton>
        {isDirty ? (
          <span className="text-sm text-muted">Máte neuložené změny.</span>
        ) : (
          <ActionMessage result={result} />
        )}
      </div>
    </form>
  );
}
