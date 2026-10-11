/**
 * Database row shapes — these mirror the Supabase tables exactly (snake_case,
 * nullability as declared in SQL). They are the *raw* data layer.
 *
 * Keep these separate from the presentation types in `./index.ts`: components
 * consume the domain `Project`/etc. shapes, and the data layer in
 * `src/lib/supabase` maps these rows onto them. That boundary is what lets the
 * UI stay stable while the storage layer changes.
 *
 * Rows are `type` aliases rather than interfaces on purpose: the Supabase
 * client generic requires them to be assignable to `Record<string, unknown>`,
 * which interfaces are not.
 */

/** A row in the `projects` table. */
export type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  /** Work tags, e.g. ["logotvorba", "vizuální identita"]. */
  tags: string[];
  sort_order: number;
  created_at: string;
};

/** A row in the `project_images` table. */
export type ProjectImageRow = {
  id: string;
  project_id: string;
  url: string;
  alt: string | null;
  sort_order: number;
};

/** The single row of the `site_settings` table. `content` is a partial
 * {@link SiteSettings} document — missing keys fall back to defaults. */
export type SiteSettingsRow = {
  id: number;
  content: Json;
  updated_at: string;
};

/** A row in the `process_steps` table. */
export type ProcessStepRow = {
  id: string;
  label: string;
  description: string;
  sort_order: number;
};

/** A row in the `testimonials` table ("Reference klientů"). */
export type TestimonialRow = {
  id: string;
  quote: string;
  author: string;
  role: string;
  logo_url: string | null;
  logo_width: number | null;
  logo_height: number | null;
  sort_order: number;
};

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

/** Insert shape: `id` (and any other defaulted column) becomes optional. */
type InsertOf<Row, Defaulted extends keyof Row> = Omit<Row, Defaulted> &
  Partial<Pick<Row, Defaulted>>;

type TableDef<Row, Defaulted extends keyof Row, Relationships = []> = {
  Row: Row;
  Insert: InsertOf<Row, Defaulted>;
  Update: Partial<Row>;
  Relationships: Relationships;
};

/**
 * Minimal typing of the public schema for the Supabase client generic.
 * Mirrors the tables created by the SQL in `supabase/migrations`.
 */
export interface Database {
  public: {
    Tables: {
      projects: TableDef<ProjectRow, "id" | "created_at">;
      project_images: TableDef<
        ProjectImageRow,
        "id",
        [
          {
            foreignKeyName: "project_images_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ]
      >;
      site_settings: TableDef<SiteSettingsRow, "id" | "updated_at">;
      process_steps: TableDef<ProcessStepRow, "id">;
      testimonials: TableDef<TestimonialRow, "id">;
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean };
    };
  };
}
