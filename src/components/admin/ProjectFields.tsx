"use client";

import { useState } from "react";

import { ImageField } from "./ImageField";
import { TextArea } from "./TextArea";
import { TextInput } from "./TextInput";
import type { ProjectRow } from "@/types/database";

interface ProjectFieldsProps {
  project?: ProjectRow;
}

/** Inputs of the project form (text, tags, cover image, order). */
export function ProjectFields({ project }: ProjectFieldsProps) {
  const [thumbnailUrl, setThumbnailUrl] = useState(project?.thumbnail_url ?? "");

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput label="Název" name="title" required defaultValue={project?.title} />
        <TextInput
          label="URL adresa (slug)"
          name="slug"
          defaultValue={project?.slug}
          placeholder="vyplní se z názvu"
          hint={project ? `Web: /portfolio/${project.slug}` : "Malá písmena bez diakritiky, např. fusionfitness."}
        />
      </div>
      <TextInput
        label="Štítky"
        name="tags"
        defaultValue={project?.tags.join(", ")}
        placeholder="logotvorba, vizuální identita"
        hint="Oddělte čárkou."
      />
      <TextArea
        label="Popis projektu"
        name="description"
        rows={8}
        defaultValue={project?.description ?? ""}
        hint="Zobrazí se v sekci „O Projektu“. Odstavce oddělte prázdným řádkem."
      />
      <ImageField
        label="Náhledový obrázek (portfolio)"
        name="thumbnail_url"
        folder={`projects/${project?.slug ?? "new"}`}
        value={thumbnailUrl}
        onChange={setThumbnailUrl}
        hint="Zobrazuje se v mřížce portfolia."
      />
      <TextInput
        label="Pořadí"
        name="sort_order"
        type="number"
        defaultValue={project?.sort_order}
        className="max-w-32"
        hint="Nižší číslo = dříve. Prázdné = na konec. Pořadí lze měnit i šipkami nahoře."
      />
    </div>
  );
}
