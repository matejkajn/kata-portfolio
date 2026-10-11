"use client";

import { AdminCard } from "./AdminCard";
import { FormFooter } from "./FormFooter";
import { ProjectFields } from "./ProjectFields";
import { useFormAction } from "@/hooks/useFormAction";
import { saveProject } from "@/lib/admin/actions/projects";
import type { ProjectRow } from "@/types/database";

interface ProjectFormProps {
  /** Existing project to edit; omit to create a new one. */
  project?: ProjectRow;
}

/** Project details. Creating a project redirects to its edit page. */
export function ProjectForm({ project }: ProjectFormProps) {
  const { onSubmit, pending, result } = useFormAction(saveProject);

  return (
    <AdminCard title="Základní údaje">
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        {project && <input type="hidden" name="id" value={project.id} />}
        <ProjectFields project={project} />
        <FormFooter
          pending={pending}
          result={result}
          submitLabel={project ? "Uložit projekt" : "Vytvořit projekt"}
        />
      </form>
    </AdminCard>
  );
}
