"use client";

import { useRef, useState, type DragEvent } from "react";

import { ActionMessage } from "./ActionMessage";
import { AdminButton } from "./AdminButton";
import { useActionRunner } from "@/hooks/useActionRunner";
import { useImageUpload } from "@/hooks/useImageUpload";
import { addProjectImages } from "@/lib/admin/actions/projectImages";
import { cn } from "@/lib/cn";

interface ProjectImageUploaderProps {
  projectId: string;
  folder: string;
}

/** Drop zone / picker that uploads images and appends them to the gallery. */
export function ProjectImageUploader({ projectId, folder }: ProjectImageUploaderProps) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { upload, uploading, error } = useImageUpload(folder);
  const { run, pending, result } = useActionRunner();
  const busy = uploading || pending;

  const handleFiles = async (fileList: FileList | null) => {
    const files = Array.from(fileList ?? []).filter((file) => file.type.startsWith("image/"));
    if (files.length === 0) return;

    const uploaded = await upload(files);
    if (uploaded.length > 0) {
      run(() => addProjectImages(projectId, uploaded.map(({ url }) => ({ url, alt: "" }))));
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    void handleFiles(event.dataTransfer.files);
  };

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={cn(
        "flex flex-col items-center gap-3 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors",
        isDragging ? "border-brand bg-brand/5" : "border-line",
      )}
    >
      <p className="text-sm text-muted">
        Přetáhněte sem obrázky, nebo je vyberte. Přidají se na konec galerie.
      </p>
      <AdminButton variant="primary" disabled={busy} onClick={() => fileInput.current?.click()}>
        {uploading ? "Nahrávám…" : pending ? "Ukládám…" : "Vybrat obrázky"}
      </AdminButton>
      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(event) => {
          void handleFiles(event.target.files);
          event.target.value = "";
        }}
      />
      {error && <p className="text-sm text-red-700">{error}</p>}
      <ActionMessage result={result} />
    </div>
  );
}
