import type { Metadata } from "next";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { getSiteSettings } from "@/lib/supabase/content";

export const metadata: Metadata = { title: "Nastavení webu" };

export default async function SettingsPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <AdminPageHeader
        title="Nastavení webu"
        description="Texty a obrázky, které se zobrazují napříč celým webem. Změny se projeví po uložení."
      />
      <SettingsForm initial={settings} />
    </>
  );
}
