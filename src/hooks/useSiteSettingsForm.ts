"use client";

import { useCallback, useState, useTransition } from "react";

import { saveSiteSettings } from "@/lib/admin/actions/settings";
import { IDLE, type ActionResult } from "@/lib/admin/result";
import type { SiteSettings, SiteSettingsSection } from "@/types";

interface UseSiteSettingsForm {
  settings: SiteSettings;
  /** Update one field; numeric fields are parsed from the input string. */
  setField: (section: SiteSettingsSection, key: string, value: string) => void;
  save: () => void;
  isDirty: boolean;
  pending: boolean;
  result: ActionResult;
}

/** Local editing state for the site-settings document plus its save action. */
export function useSiteSettingsForm(initial: SiteSettings): UseSiteSettingsForm {
  const [settings, setSettings] = useState<SiteSettings>(initial);
  const [isDirty, setIsDirty] = useState(false);
  const [result, setResult] = useState<ActionResult>(IDLE);
  const [pending, startTransition] = useTransition();

  const setField = useCallback(
    (section: SiteSettingsSection, key: string, value: string) => {
      setSettings((previous) => {
        const current = previous[section] as Record<string, string | number>;
        const next = typeof current[key] === "number" ? Number(value) || 0 : value;
        return { ...previous, [section]: { ...current, [key]: next } };
      });
      setIsDirty(true);
    },
    [],
  );

  const save = useCallback(() => {
    startTransition(async () => {
      const outcome = await saveSiteSettings(settings);
      setResult(outcome);
      if (outcome.status === "success") setIsDirty(false);
    });
  }, [settings]);

  return { settings, setField, save, isDirty, pending, result };
}
