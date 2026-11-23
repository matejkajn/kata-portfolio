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
    description:
      "Hlavní logo se zobrazuje v navigaci a v administraci. Patička může mít vlastní logo. Favicon je ikona v záložce prohlížeče.",
    fields: [
      {
        key: "logoUrl",
        label: "Logo",
        kind: "image",
        hint: "Ideálně PNG nebo SVG s průhledným pozadím. Na tmavém pozadí se logo automaticky zobrazí bíle. Po odebrání se použije výchozí logo.",
      },
      {
        key: "footerLogoUrl",
        label: "Logo v patičce",
        kind: "image",
        hint: "Volitelné. Pokud není nahrané, použije se v patičce hlavní logo.",
      },
      {
        key: "faviconUrl",
        label: "Favicon (ikona v záložce prohlížeče)",
        kind: "image",
        hint: "Čtvercový obrázek, ideálně PNG 512 × 512 px (případně SVG nebo ICO). Prohlížeče ikonu ukládají do mezipaměti, změna se může projevit až po obnovení. Po odebrání se použije výchozí ikona.",
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
      {
        key: "instagramIconUrl",
        label: "Instagram — ikona",
        kind: "image",
        hint: "Malá čtvercová ikona (ideálně PNG nebo SVG s průhledným pozadím). Po odebrání se použije výchozí ikona.",
      },
      { key: "linkedinLabel", label: "LinkedIn — text", kind: "text" },
      { key: "linkedinUrl", label: "LinkedIn — odkaz", kind: "url" },
      {
        key: "linkedinIconUrl",
        label: "LinkedIn — ikona",
        kind: "image",
        hint: "Malá čtvercová ikona (ideálně PNG nebo SVG s průhledným pozadím). Po odebrání se použije výchozí ikona.",
      },
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
