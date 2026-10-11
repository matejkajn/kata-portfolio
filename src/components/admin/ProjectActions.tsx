"use client";

import { RowActions } from "./RowActions";
import { deleteProject, moveProject } from "@/lib/admin/actions/projects";

interface ProjectActionsProps {
  id: string;
  title: string;
  isFirst: boolean;
  isLast: boolean;
}

/** Reorder / delete controls in the project page header. */
export function ProjectActions({ id, title, isFirst, isLast }: ProjectActionsProps) {
  return (
    <RowActions
      isFirst={isFirst}
      isLast={isLast}
      onMove={(direction) => moveProject(id, direction)}
      onDelete={() => deleteProject(id)}
      deleteConfirm={`Smazat projekt „${title}“ včetně všech obrázků? Tuto akci nelze vrátit.`}
      deleteLabel="Smazat projekt"
    />
  );
}
