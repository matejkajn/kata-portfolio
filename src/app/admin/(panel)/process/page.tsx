import type { Metadata } from "next";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProcessStepForm } from "@/components/admin/ProcessStepForm";
import { listProcessSteps } from "@/lib/admin/queries";

export const metadata: Metadata = { title: "Kreativní proces" };

export default async function ProcessPage() {
  const steps = await listProcessSteps();

  return (
    <>
      <AdminPageHeader
        title="Kreativní proces"
        description="Kroky časové osy na domovské stránce. Nadpis sekce změníte v Nastavení webu."
      />
      <div className="flex flex-col gap-6">
        {steps.map((step, index) => (
          <ProcessStepForm
            key={step.id}
            step={step}
            index={index}
            isFirst={index === 0}
            isLast={index === steps.length - 1}
          />
        ))}
        <ProcessStepForm />
      </div>
    </>
  );
}
