"use client";

import { useId, useRef, type ChangeEvent } from "react";

import { AdminButton } from "./AdminButton";
import { Field } from "./Field";
import { ImagePreview } from "./ImagePreview";
import { useImageUpload, type UploadedImage } from "@/hooks/useImageUpload";
import { INPUT_CLASS } from "@/lib/admin/styles";

interface ImageFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  /** Storage folder for uploads, e.g. "site" or "projects/vidix". */
  folder: string;
  /** When set, the URL is also posted with the surrounding form. */
  name?: string;
  hint?: string;
  /** Called with the natural size of a freshly uploaded image. */
  onUploaded?: (image: UploadedImage) => void;
}

/** Image picker: preview, upload to storage, or paste a URL. */
export function ImageField({
  label,
  value,
  onChange,
  folder,
  name,
  hint,
  onUploaded,
}: ImageFieldProps) {
  const inputId = useId();
  const fileInput = useRef<HTMLInputElement>(null);
  const { upload, uploading, error } = useImageUpload(folder);

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    const [image] = await upload([file]);
    if (image) {
      onChange(image.url);
      onUploaded?.(image);
    }
  };

  return (
    <Field label={label} htmlFor={inputId} hint={hint}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <ImagePreview src={value} className="h-28 w-full shrink-0 sm:w-40" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <input
            id={inputId}
            name={name}
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="https://… nebo nahrajte soubor"
            className={INPUT_CLASS}
          />
          <div className="flex flex-wrap items-center gap-2">
            <AdminButton
              size="sm"
              disabled={uploading}
              onClick={() => fileInput.current?.click()}
            >
              {uploading ? "Nahrávám…" : "Nahrát obrázek"}
            </AdminButton>
            {value && (
              <AdminButton size="sm" variant="ghost" onClick={() => onChange("")}>
                Odebrat
              </AdminButton>
            )}
            {error && <span className="text-xs text-red-700">{error}</span>}
          </div>
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
        </div>
      </div>
    </Field>
  );
}
