"use client";

import { useState } from "react";

import { ImageField } from "./ImageField";
import { TextArea } from "./TextArea";
import { TextInput } from "./TextInput";
import { MAX_RATING } from "@/lib/rating";
import type { TestimonialRow } from "@/types/database";

interface TestimonialFieldsProps {
  testimonial?: TestimonialRow;
}

/** Fields of a reference. Keyed by the parent so "add new" can reset it. */
export function TestimonialFields({ testimonial }: TestimonialFieldsProps) {
  const [photoUrl, setPhotoUrl] = useState(testimonial?.photo_url ?? "");

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput label="Jméno" name="author" required defaultValue={testimonial?.author} />
        <TextInput
          label="Hodnocení (počet hvězd)"
          name="rating"
          type="number"
          min={1}
          max={MAX_RATING}
          defaultValue={testimonial?.rating ?? MAX_RATING}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput
          label="Pozice"
          name="role"
          placeholder="např. CEO"
          defaultValue={testimonial?.role}
        />
        <TextInput label="Firma" name="company" defaultValue={testimonial?.company} />
      </div>
      <TextArea label="Citace" name="quote" rows={4} defaultValue={testimonial?.quote} />
      <ImageField
        label="Fotka"
        name="photo_url"
        folder="references"
        value={photoUrl}
        onChange={setPhotoUrl}
        hint="Čtvercový portrét, ideálně alespoň 300 × 300 px. Bez fotky se zobrazí iniciály."
      />
    </div>
  );
}
