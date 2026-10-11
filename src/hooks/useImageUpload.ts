"use client";

import { useCallback, useMemo, useState } from "react";

import { createBrowserSupabase } from "@/lib/supabase/browser";
import { STORAGE_BUCKET } from "@/lib/supabase/env";
import { slugify } from "@/lib/text";

export interface UploadedImage {
  url: string;
  /** Natural pixel size, handy for logos rendered via next/image. */
  width: number;
  height: number;
}

interface UseImageUpload {
  /** Upload files in order; resolves with the ones that succeeded. */
  upload: (files: File[]) => Promise<UploadedImage[]>;
  uploading: boolean;
  error: string | null;
}

/** Collision-free storage key that keeps the original name readable. */
function storagePath(folder: string, file: File): string {
  const dot = file.name.lastIndexOf(".");
  const base = slugify(dot > 0 ? file.name.slice(0, dot) : file.name) || "image";
  const extension = dot > 0 ? file.name.slice(dot + 1).toLowerCase() : "png";
  const unique = crypto.randomUUID().slice(0, 8);
  return `${folder}/${base}-${unique}.${extension}`;
}

async function readDimensions(file: File): Promise<{ width: number; height: number }> {
  try {
    const bitmap = await createImageBitmap(file);
    const size = { width: bitmap.width, height: bitmap.height };
    bitmap.close();
    return size;
  } catch {
    // e.g. SVG — dimensions are optional, so don't fail the upload.
    return { width: 0, height: 0 };
  }
}

/**
 * Uploads images straight from the browser to the public storage bucket
 * (bypassing the Server Action body-size limit). Storage RLS only lets admins
 * write, so the signed-in session is what authorises the upload.
 */
export function useImageUpload(folder: string): UseImageUpload {
  const supabase = useMemo(() => createBrowserSupabase(), []);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(
    async (files: File[]): Promise<UploadedImage[]> => {
      setUploading(true);
      setError(null);
      const uploaded: UploadedImage[] = [];

      try {
        for (const file of files) {
          const path = storagePath(folder, file);
          const { error: uploadError } = await supabase.storage
            .from(STORAGE_BUCKET)
            .upload(path, file, { cacheControl: "31536000", upsert: false });
          if (uploadError) throw uploadError;

          const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
          uploaded.push({ url: data.publicUrl, ...(await readDimensions(file)) });
        }
      } catch (uploadError) {
        setError(
          uploadError instanceof Error ? uploadError.message : "Nahrání se nezdařilo.",
        );
      } finally {
        setUploading(false);
      }

      return uploaded;
    },
    [folder, supabase],
  );

  return { upload, uploading, error };
}
