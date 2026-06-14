/**
 * Database row shapes — these mirror the Supabase tables exactly (snake_case,
 * nullability as declared in SQL). They are the *raw* data layer.
 *
 * Keep these separate from the presentation types in `./index.ts`: components
 * consume the domain `Project`/etc. shapes, and the data layer in
 * `src/lib/supabase` maps these rows onto them. That boundary is what lets the
 * UI stay stable while the storage layer changes.
 */

/** A row in the `projects` table. */
export interface ProjectRow {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  /** Work tags, e.g. ["logotvorba", "vizuální identita"]. */
  tags: string[];
  sort_order: number;
  created_at: string;
}

/** A row in the `project_images` table. */
export interface ProjectImageRow {
  id: string;
  project_id: string;
  url: string;
  alt: string | null;
  sort_order: number;
}

/**
 * Minimal typing of the public schema for the Supabase client generic.
 * Mirrors the two tables created in Iteration 1; writes are not modelled
 * because the public site only reads (admin writes land in Iteration 2).
 */
export interface Database {
  public: {
    Tables: {
      projects: {
        Row: ProjectRow;
        Insert: Omit<ProjectRow, "id" | "created_at"> &
          Partial<Pick<ProjectRow, "id" | "created_at">>;
        Update: Partial<ProjectRow>;
      };
      project_images: {
        Row: ProjectImageRow;
        Insert: Omit<ProjectImageRow, "id"> & Partial<Pick<ProjectImageRow, "id">>;
        Update: Partial<ProjectImageRow>;
      };
    };
  };
}
