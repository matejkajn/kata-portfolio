import { AdminCard } from "./AdminCard";
import { SettingsFieldInput } from "./SettingsFieldInput";
import type { SettingsSectionDef } from "@/lib/admin/settingsSchema";
import type { SiteSettings, SiteSettingsSection } from "@/types";

interface SettingsSectionCardProps {
  definition: SettingsSectionDef;
  values: SiteSettings[SiteSettingsSection];
  onChange: (key: string, value: string) => void;
}

/** One section of the site-settings form (hero, about, footer…). */
export function SettingsSectionCard({ definition, values, onChange }: SettingsSectionCardProps) {
  const record = values as Record<string, string | number>;

  return (
    <AdminCard title={definition.title} description={definition.description}>
      <div className="flex flex-col gap-5">
        {definition.fields.map((field) => (
          <SettingsFieldInput
            key={field.key}
            label={field.label}
            kind={field.kind}
            hint={field.hint}
            value={record[field.key]}
            onChange={(value) => onChange(field.key, value)}
          />
        ))}
      </div>
    </AdminCard>
  );
}
