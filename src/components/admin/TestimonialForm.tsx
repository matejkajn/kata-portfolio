"use client";

import { AdminCard } from "./AdminCard";
import { FormFooter } from "./FormFooter";
import { RowActions } from "./RowActions";
import { TestimonialFields } from "./TestimonialFields";
import { useFormAction } from "@/hooks/useFormAction";
import {
  deleteTestimonial,
  moveTestimonial,
  saveTestimonial,
} from "@/lib/admin/actions/testimonials";
import type { TestimonialRow } from "@/types/database";

interface TestimonialFormProps {
  /** Existing reference to edit; omit for the "add new" form. */
  testimonial?: TestimonialRow;
  isFirst?: boolean;
  isLast?: boolean;
}

/** Edit (or add) one client reference. */
export function TestimonialForm({ testimonial, isFirst, isLast }: TestimonialFormProps) {
  const { onSubmit, pending, result, resetKey } = useFormAction(saveTestimonial, {
    resetOnSuccess: !testimonial,
  });

  return (
    <AdminCard
      title={testimonial ? testimonial.author : "Přidat referenci"}
      actions={
        testimonial && (
          <RowActions
            isFirst={isFirst}
            isLast={isLast}
            onMove={(direction) => moveTestimonial(testimonial.id, direction)}
            onDelete={() => deleteTestimonial(testimonial.id)}
            deleteConfirm={`Smazat referenci od „${testimonial.author}“?`}
          />
        )
      }
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        {testimonial && <input type="hidden" name="id" value={testimonial.id} />}
        <TestimonialFields key={resetKey} testimonial={testimonial} />
        <FormFooter
          pending={pending}
          result={result}
          submitLabel={testimonial ? "Uložit" : "Přidat referenci"}
        />
      </form>
    </AdminCard>
  );
}
