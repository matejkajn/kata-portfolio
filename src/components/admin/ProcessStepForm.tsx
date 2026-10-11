"use client";

import { AdminCard } from "./AdminCard";
import { FormFooter } from "./FormFooter";
import { RowActions } from "./RowActions";
import { TextArea } from "./TextArea";
import { TextInput } from "./TextInput";
import { useFormAction } from "@/hooks/useFormAction";
import {
  deleteProcessStep,
  moveProcessStep,
  saveProcessStep,
} from "@/lib/admin/actions/processSteps";
import type { ProcessStepRow } from "@/types/database";

interface ProcessStepFormProps {
  /** Existing step to edit; omit for the "add new" form. */
  step?: ProcessStepRow;
  index?: number;
  isFirst?: boolean;
  isLast?: boolean;
}

/** Edit (or add) one step of the creative-process timeline. */
export function ProcessStepForm({ step, index, isFirst, isLast }: ProcessStepFormProps) {
  const { onSubmit, pending, result, resetKey } = useFormAction(saveProcessStep, {
    resetOnSuccess: !step,
  });

  return (
    <AdminCard
      title={step ? `${(index ?? 0) + 1}. ${step.label}` : "Přidat krok"}
      actions={
        step && (
          <RowActions
            isFirst={isFirst}
            isLast={isLast}
            onMove={(direction) => moveProcessStep(step.id, direction)}
            onDelete={() => deleteProcessStep(step.id)}
            deleteConfirm={`Smazat krok „${step.label}“?`}
          />
        )
      }
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        {step && <input type="hidden" name="id" value={step.id} />}
        <div key={resetKey} className="flex flex-col gap-5">
          <TextInput label="Název kroku" name="label" required defaultValue={step?.label} />
          <TextArea label="Popis" name="description" rows={3} defaultValue={step?.description} />
        </div>
        <FormFooter pending={pending} result={result} submitLabel={step ? "Uložit" : "Přidat krok"} />
      </form>
    </AdminCard>
  );
}
