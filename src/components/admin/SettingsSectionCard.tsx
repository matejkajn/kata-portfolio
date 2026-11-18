import { AdminCard } from "./AdminCard";
import { SettingsFieldInput } from "./SettingsFieldInput";
import { cn } from "@/lib/cn";
import { DEFAULT_SITE_SETTINGS } from "@/lib/content/siteSettings";
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
  const defaults = DEFAULT_SITE_SETTINGS[definition.section] as Record<string, string | number>;

  return (
    <AdminCard title={definition.title} description={definition.description}>
      <div className={cn("grid gap-5", definition.twoColumns && "sm:grid-cols-2")}>
        {definition.fields.map((field) => (
          <SettingsFieldInput
            key={field.key}
            label={field.label}
            kind={field.kind}
            hint={field.hint}
            value={record[field.key]}
            defaultValue={defaults[field.key]}
            onChange={(value) => onChange(field.key, value)}
          />
        ))}
      </div>
    </AdminCard>
  );
}
