import type { SiteSettings, SiteSettingsSection } from "@/types";

/**
 * The site copy as originally designed. Used whenever `site_settings` is
 * missing a value, so the site renders correctly before (and while) the
 * administration is used to fill the database.
 */
export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  seo: {
    title: "Kateřina Hršelová — Grafická designérka",
    description:
      "Vytvářím vizuální identity, které zaujmou a vyprávějí příběh vaší firmy. Kreativní design, který promlouvá.",
  },
  hero: {
    title: "Kreativní design,\nkterý *promlouvá*",
    text: "Vytvářím vizuální identity, které zaujmou a vyprávějí příběh vaší firmy. Každý projekt je pro mě jedinečnou příležitostí ke kreativnímu vyjádření.",
    buttonLabel: "Portfolio",
  },
  about: {
    label: "O mně",
    heading: "Ahoj, jsem grafická designérka na volné noze z Hradce Králové",
    text: "Jmenuji se Kateřina a jsem grafická designérka zaměřující se na vizuální identitu, branding a grafické materiály pro tisk i online prostředí. Už od roku 2020 se věnuji práci s klienty od návrhu log, vizitek a plakátů až po rozsáhlejší katalogy a firemní prezentace. Nejvíc mě naplňuje, když můžu vytvořit kompletní vizuální koncept od prvního nápadu až po finální realizaci.\n\nMoje práce kombinuje kreativitu s důrazem na detail a funkčnost. Věřím, že kvalitní design musí být nejen esteticky zajímavý, ale především srozumitelný a použitelný. Díky zkušenostem z praxe i studia v Portugalsku mám širší pohled na vizuální tvorbu – od tradičních technik až po moderní digitální nástroje.",
    imageUrl: "/homepage/profile.png",
    imageAlt: "Portrét Kateřiny",
  },
  portfolio: {
    heading: "Moje portfolio",
    subtitle:
      "Ukázky projektů, které ukazují můj tvůrčí přístup a schopnost vytvářet jedinečné vizuální řešení.",
    featuredCount: 4,
    moreLabel: "Zobrazit více",
  },
  process: {
    heading: "Jak probíhá *společný kreativní proces*?",
    subtitle:
      "Provedu vás celou spoluprací krok za krokem — od prvního setkání až po předání hotových materiálů.",
  },
  references: {
    heading: "Reference klientů",
    subtitle: "Co říkají moji spokojení klienti o naší spolupráci.",
  },
  contact: {
    heading: "Pojďme vytvořit něco *výjimečného*",
    text: "Máte projekt, který čeká na kreativní zpracování? Nebojte se mě kontaktovat.",
    imageUrl: "/footer/form.jpg",
    imageAlt: "Ukázka realizace — logo Active Estate",
    successMessage: "Děkuji, ozvu se vám co nejdříve.",
  },
  cta: {
    heading: "Pojďme vytvořit něco *výjimečného*",
    buttonLabel: "Kontakt",
  },
  footer: {
    email: "hrselova.katerina@gmail.com",
    instagramLabel: "katerina.graphics",
    instagramUrl: "https://instagram.com/katerina.graphics",
    linkedinLabel: "Kateřina Hršelová",
    linkedinUrl: "https://www.linkedin.com/in/kateřina-hršelová-35a324279",
    copyright: "© 2026 Kateřina Hršelová. All rights reserved.",
  },
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Coerce an untrusted document (DB JSON or admin form input) into a complete
 * {@link SiteSettings}: known keys of the right primitive type are kept,
 * everything else falls back to {@link DEFAULT_SITE_SETTINGS}.
 */
export function normalizeSiteSettings(input: unknown): SiteSettings {
  const source = isRecord(input) ? input : {};
  const result = structuredClone(DEFAULT_SITE_SETTINGS);

  for (const section of Object.keys(result) as SiteSettingsSection[]) {
    const incoming = source[section];
    if (!isRecord(incoming)) continue;

    const target = result[section] as Record<string, string | number>;
    for (const key of Object.keys(target)) {
      const value = incoming[key];
      if (typeof value === typeof target[key]) {
        target[key] = value as string | number;
      }
    }
  }

  return result;
}
