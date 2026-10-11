import type { Metadata } from "next";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProjectForm } from "@/components/admin/ProjectForm";

export const metadata: Metadata = { title: "Nový projekt" };

export default function NewProjectPage() {
  return (
    <>
      <AdminPageHeader
        title="Nový projekt"
        description="Po vytvoření budete moci přidat obrázky projektu."
      />
      <ProjectForm />
    </>
  );
}
