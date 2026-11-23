/**
 * Shared domain types for the portfolio site.
 *
 * These describe the content the public site renders. The data layer in
 * `src/lib/supabase` maps Supabase rows onto them; `src/lib/content` holds the
 * defaults used until the database has been populated.
 */

/** A single portfolio project / case study. */
export interface Project {
  /** URL-safe identifier, matches the design file names (e.g. "fusionfitness"). */
  slug: string;
  /** Display title, e.g. "Fusion Fitness". */
  title: string;
  /** Comma-separated work tags, e.g. "logotvorba, vizuální identita". */
  tags: string;
  /** Cover image URL (Supabase storage); a placeholder renders when absent. */
  imageUrl?: string;
  /** Optional solid background used by the placeholder cover. */
  imageColor?: string;
}

/** A single image belonging to a project (gallery / case-study body). */
export interface ProjectImage {
  url: string;
  /** Accessible description; may be empty if none was provided. */
  alt: string;
}

/**
 * A project with its full case-study content. Returned for the detail page;
 * the listing grid only needs the lighter {@link Project}.
 */
export interface ProjectDetail extends Project {
  /** Case-study body text. */
  description: string | null;
  /** Gallery images, ordered for display. */
  images: ProjectImage[];
}

/** One step in the "kreativní proces" timeline. */
export interface ProcessStep {
  /** Database id; absent for the built-in defaults. */
  id?: string;
  /** Pill label, e.g. "Analýza". */
  label: string;
  /** Description paragraph. */
  description: string;
}

/** A client testimonial. */
export interface Reference {
  /** Database id; absent for the built-in defaults. */
  id?: string;
  /** Quote body. */
  quote: string;
  /** Client name. */
  author: string;
  /** Job title, e.g. "CEO". */
  role: string;
  /** Client company, e.g. "Vidix". */
  company: string;
  /** Portrait photo URL; initials render when absent. */
  photoUrl?: string;
  /** Star rating, 1–5. */
  rating: number;
}

/** A primary navigation entry. */
export interface NavLink {
  label: string;
  href: string;
  /** Homepage section that marks this link active while it is in view. */
  sectionId: string;
}

/**
 * All editable site-wide copy, grouped by page section. Stored as one JSON
 * document in `site_settings.content`.
 *
 * Heading fields support light markup (see `HighlightedText`): `*word*`
 * renders in the accent colour and a newline forces a line break.
 */
export interface SiteSettings {
  /** Site colour palette (hex `#rrggbb`), exposed to CSS as `--color-*`. */
  theme: ThemeColors;
  brand: {
    /** Site logo (local path or storage URL); empty falls back to the default. */
    logoUrl: string;
    /** Footer logo; empty falls back to {@link logoUrl}. */
    footerLogoUrl: string;
    /** Browser tab icon (local path or storage URL); empty falls back to the default. */
    faviconUrl: string;
  };
  seo: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    text: string;
    buttonLabel: string;
  };
  about: {
    label: string;
    heading: string;
    /** Paragraphs separated by blank lines. */
    text: string;
    imageUrl: string;
    imageAlt: string;
  };
  portfolio: {
    heading: string;
    subtitle: string;
    /** How many projects the homepage shows before "Zobrazit více". */
    featuredCount: number;
    moreLabel: string;
  };
  process: {
    heading: string;
    subtitle: string;
  };
  references: {
    heading: string;
    subtitle: string;
  };
  contact: {
    heading: string;
    text: string;
    imageUrl: string;
    imageAlt: string;
    successMessage: string;
  };
  cta: {
    heading: string;
    buttonLabel: string;
  };
  footer: {
    email: string;
    instagramLabel: string;
    instagramUrl: string;
    /** Instagram icon (local path or storage URL); empty falls back to the default. */
    instagramIconUrl: string;
    linkedinLabel: string;
    linkedinUrl: string;
    /** LinkedIn icon (local path or storage URL); empty falls back to the default. */
    linkedinIconUrl: string;
    copyright: string;
  };
}

export type SiteSettingsSection = keyof SiteSettings;

/** The admin-editable colour palette. Every value is a `#rrggbb` hex string. */
export interface ThemeColors {
  /** Primary wine — hero, process, reference card headers, footer text. */
  wine: string;
  /** Lighter wine — contact section, bottom of the process gradient. */
  wineLight: string;
  /** Blue of the soft "stains" in the gradient backgrounds. */
  stain: string;
  /** Dark navy — headings and buttons on white. */
  navy: string;
  /** Highlighted heading words and rating stars. */
  accent: string;
  /** Cream — card bodies, button text, headings on dark. */
  cream: string;
  /** Soft pink — process pills, names on reference cards. */
  blush: string;
  /** Body text on white. */
  ink: string;
  /** Secondary text (copyright, hints). */
  muted: string;
}
