"use client";

import { useState } from "react";

import { AdminButton } from "./AdminButton";
import { FormFooter } from "./FormFooter";
import { ImageField } from "./ImageField";
import { RowActions } from "./RowActions";
import { TextInput } from "./TextInput";
import { useActionRunner } from "@/hooks/useActionRunner";
import { useFormAction } from "@/hooks/useFormAction";
import {
  deleteProjectImage,
  moveProjectImage,
  saveProjectImage,
  setProjectThumbnail,
} from "@/lib/admin/actions/projectImages";
import type { ProjectImageRow } from "@/types/database";

interface ProjectImageItemProps {
  image: ProjectImageRow;
  index: number;
  total: number;
  folder: string;
  isThumbnail: boolean;
}

/** One gallery image: replace / alt text, reorder, delete, use as cover. */
export function ProjectImageItem({ image, index, total, folder, isThumbnail }: ProjectImageItemProps) {
  const [url, setUrl] = useState(image.url);
  const form = useFormAction(saveProjectImage);
  const thumbnail = useActionRunner();

  return (
    <li className="flex flex-col gap-4 rounded-xl border border-line p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink">
          <span>Obrázek {index + 1}</span>
          {index === 0 && (
            <span className="rounded-full bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand">
              Hlavní obrázek
            </span>
          )}
          {isThumbnail && (
            <span className="rounded-full bg-accent/30 px-2 py-0.5 text-xs font-medium text-ink">
              Náhled v portfoliu
            </span>
          )}
        </div>
        <RowActions
          isFirst={index === 0}
          isLast={index === total - 1}
          onMove={(direction) => moveProjectImage(image.id, image.project_id, direction)}
          onDelete={() => deleteProjectImage(image.id)}
          deleteConfirm="Odebrat obrázek z projektu?"
          deleteLabel="Odebrat"
        />
      </div>

      <form onSubmit={form.onSubmit} className="flex flex-col gap-4">
        <input type="hidden" name="id" value={image.id} />
        <ImageField label="Obrázek" name="url" folder={folder} value={url} onChange={setUrl} />
        <TextInput
          label="Popis (alt)"
          name="alt"
          defaultValue={image.alt ?? ""}
          hint="Krátký popis obsahu obrázku pro nevidomé a vyhledávače."
        />
        <FormFooter pending={form.pending} result={form.result}>
          {!isThumbnail && (
            <AdminButton
              size="sm"
              disabled={thumbnail.pending}
              onClick={() => thumbnail.run(() => setProjectThumbnail(image.project_id, image.url))}
            >
              Použít jako náhled
            </AdminButton>
          )}
        </FormFooter>
      </form>
    </li>
  );
}
