/**
 * Shared domain types for the portfolio site.
 *
 * These describe the content the public site renders. For Iteration 1 the
 * content is served from the static modules in `src/lib/content`; the same
 * shapes are intended to back the Supabase-sourced data later, so components
 * never need to change when the data layer is swapped.
 */

/** A single portfolio project / case study. */
export interface Project {
  /** URL-safe identifier, matches the design file names (e.g. "fusionfitness"). */
  slug: string;
  /** Display title, e.g. "Fusion Fitness". */
  title: string;
  /** Comma-separated work tags, e.g. "logotvorba, vizuální identita". */
  tags: string;
  /** Cover image URL (Supabase storage later; placeholder for now). */
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
  /** Pill label, e.g. "Analýza". */
  label: string;
  /** Description paragraph. */
  description: string;
}

/** A client testimonial. */
export interface Reference {
  /** Quote body. */
  quote: string;
  /** Client name. */
  author: string;
  /** Client role / company, e.g. "Majitel společnosti". */
  role: string;
  /** Optional logo image URL. */
  logoUrl?: string;
  /** Intrinsic logo width in px (for next/image aspect ratio). */
  logoWidth?: number;
  /** Intrinsic logo height in px (for next/image aspect ratio). */
  logoHeight?: number;
}

/** A primary navigation entry. */
export interface NavLink {
  label: string;
  href: string;
}
