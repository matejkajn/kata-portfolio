import type { SiteSettings, SiteSettingsSection } from "@/types";

/** How a settings field is edited. */
export type SettingsFieldKind =
  | "text"
  | "textarea"
  | "image"
  | "number"
  | "email"
  | "url"
  | "color";

export interface SettingsFieldDef<S extends SiteSettingsSection> {
  key: keyof SiteSettings[S] & string;
  label: string;
  kind: SettingsFieldKind;
  hint?: string;
}

/** One card in the settings form, tied to a section of {@link SiteSettings}. */
export type SettingsSectionDef = {
  [S in SiteSettingsSection]: {
    section: S;
    title: string;
    description?: string;
    /** Lay the fields out in two columns on wider screens (short inputs). */
    twoColumns?: boolean;
    fields: SettingsFieldDef<S>[];
  };
}[SiteSettingsSection];

const HIGHLIGHT_HINT = "Text mezi *hvězdičkami* se zvýrazní barvou, nový řádek zalomí nadpis.";
const PARAGRAPHS_HINT = "Odstavce oddělte prázdným řádkem.";

/**
 * Drives the generic settings form: adding a field here (and to
 * `SiteSettings` + its defaults) is all it takes to make new copy editable.
 */
export const SETTINGS_SCHEMA: SettingsSectionDef[] = [
  {
    section: "theme",
    title: "Barvy webu",
    description:
      "Barevná paleta celého webu. Po uložení se změna projeví na všech stránkách.",
    twoColumns: true,
    fields: [
      {
        key: "wine",
        label: "Hlavní vínová",
        kind: "color",
        hint: "Pozadí úvodu, procesu a hlaviček referencí; text patičky.",
      },
      {
        key: "wineLight",
        label: "Světlejší vínová",
        kind: "color",
        hint: "Pozadí kontaktu, spodní část sekce procesu.",
      },
      {
        key: "stain",
        label: "Modrá (skvrny v pozadí)",
        kind: "color",
        hint: "Rozmazané pohyblivé skvrny v úvodu a záře v kontaktu.",
      },
      {
        key: "navy",
        label: "Tmavě modrá",
        kind: "color",
        hint: "Nadpisy a tlačítka na bílém pozadí.",
      },
      {
        key: "accent",
        label: "Zvýraznění",
        kind: "color",
        hint: "Slova v *hvězdičkách* v nadpisech a hvězdičky hodnocení.",
      },
      {
        key: "cream",
        label: "Krémová",
        kind: "color",
        hint: "Karty referencí, nadpisy a text tlačítek na tmavém pozadí.",
      },
      {
        key: "blush",
        label: "Růžová",
        kind: "color",
        hint: "Štítky kroků procesu, jména v referencích.",
      },
      { key: "ink", label: "Text", kind: "color", hint: "Běžný text na bílém pozadí." },
      {
        key: "muted",
        label: "Doplňkový text",
        kind: "color",
        hint: "Copyright a méně důležité popisky.",
      },
    ],
  },
  {
    section: "brand",
    title: "Logo",
    description: "Zobrazuje se v navigaci, v patičce a v administraci.",
    fields: [
      {
        key: "logoUrl",
        label: "Logo",
        kind: "image",
        hint: "Ideálně PNG nebo SVG s průhledným pozadím. Na tmavém pozadí se logo automaticky zobrazí bíle. Po odebrání se použije výchozí logo.",
      },
    ],
  },
  {
    section: "hero",
    title: "Úvod (hero)",
    description: "První obrazovka domovské stránky.",
    fields: [
      { key: "title", label: "Nadpis", kind: "textarea", hint: HIGHLIGHT_HINT },
      { key: "text", label: "Text", kind: "textarea" },
      { key: "buttonLabel", label: "Text tlačítka", kind: "text" },
    ],
  },
  {
    section: "about",
    title: "O mně",
    fields: [
      { key: "label", label: "Štítek nad nadpisem", kind: "text" },
      { key: "heading", label: "Nadpis", kind: "text" },
      { key: "text", label: "Text", kind: "textarea", hint: PARAGRAPHS_HINT },
      { key: "imageUrl", label: "Portrét", kind: "image" },
      { key: "imageAlt", label: "Popis portrétu (alt)", kind: "text" },
    ],
  },
  {
    section: "portfolio",
    title: "Portfolio",
    description: "Nadpis sekce na domovské stránce i stránky /portfolio.",
    fields: [
      { key: "heading", label: "Nadpis", kind: "text" },
      { key: "subtitle", label: "Podnadpis", kind: "textarea" },
      {
        key: "featuredCount",
        label: "Počet projektů na domovské stránce",
        kind: "number",
      },
      { key: "moreLabel", label: "Text tlačítka „více“", kind: "text" },
    ],
  },
  {
    section: "process",
    title: "Kreativní proces",
    description: "Jednotlivé kroky upravíte v sekci Proces.",
    fields: [
      { key: "heading", label: "Nadpis", kind: "text", hint: HIGHLIGHT_HINT },
      { key: "subtitle", label: "Podnadpis", kind: "textarea" },
    ],
  },
  {
    section: "references",
    title: "Reference",
    description: "Jednotlivé reference upravíte v sekci Reference.",
    fields: [
      { key: "heading", label: "Nadpis", kind: "text", hint: HIGHLIGHT_HINT },
      { key: "subtitle", label: "Podnadpis", kind: "textarea" },
    ],
  },
  {
    section: "contact",
    title: "Kontakt",
    fields: [
      { key: "heading", label: "Nadpis", kind: "text", hint: HIGHLIGHT_HINT },
      { key: "text", label: "Text", kind: "textarea" },
      { key: "imageUrl", label: "Obrázek", kind: "image" },
      { key: "imageAlt", label: "Popis obrázku (alt)", kind: "text" },
      { key: "successMessage", label: "Poděkování po odeslání formuláře", kind: "text" },
    ],
  },
  {
    section: "cta",
    title: "Výzva na konci projektu",
    description: "Banner pod každým projektem a na stránce /portfolio.",
    fields: [
      { key: "heading", label: "Nadpis", kind: "text", hint: HIGHLIGHT_HINT },
      { key: "buttonLabel", label: "Text tlačítka", kind: "text" },
    ],
  },
  {
    section: "footer",
    title: "Patička",
    fields: [
      { key: "email", label: "E-mail", kind: "email" },
      { key: "instagramLabel", label: "Instagram — text", kind: "text" },
      { key: "instagramUrl", label: "Instagram — odkaz", kind: "url" },
      { key: "linkedinLabel", label: "LinkedIn — text", kind: "text" },
      { key: "linkedinUrl", label: "LinkedIn — odkaz", kind: "url" },
      { key: "copyright", label: "Copyright", kind: "text" },
    ],
  },
  {
    section: "seo",
    title: "SEO",
    description: "Titulek a popis domovské stránky pro vyhledávače a sdílení.",
    fields: [
      { key: "title", label: "Titulek stránky", kind: "text" },
      { key: "description", label: "Popis", kind: "textarea" },
    ],
  },
];
