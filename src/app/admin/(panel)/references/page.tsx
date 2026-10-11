import type { Metadata } from "next";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { listTestimonials } from "@/lib/admin/queries";

export const metadata: Metadata = { title: "Reference" };

export default async function ReferencesPage() {
  const testimonials = await listTestimonials();

  return (
    <>
      <AdminPageHeader
        title="Reference klientů"
        description="Citace spokojených klientů na domovské stránce. Nadpis sekce změníte v Nastavení webu."
      />
      <div className="flex flex-col gap-6">
        {testimonials.map((testimonial, index) => (
          <TestimonialForm
            key={testimonial.id}
            testimonial={testimonial}
            isFirst={index === 0}
            isLast={index === testimonials.length - 1}
          />
        ))}
        <TestimonialForm />
      </div>
    </>
  );
}
