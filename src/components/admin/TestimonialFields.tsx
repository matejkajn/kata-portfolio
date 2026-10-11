"use client";

import { useState } from "react";

import { ImageField } from "./ImageField";
import { TextArea } from "./TextArea";
import { TextInput } from "./TextInput";
import type { TestimonialRow } from "@/types/database";

interface TestimonialFieldsProps {
  testimonial?: TestimonialRow;
}

/** Fields of a reference. Keyed by the parent so "add new" can reset it. */
export function TestimonialFields({ testimonial }: TestimonialFieldsProps) {
  const [logoUrl, setLogoUrl] = useState(testimonial?.logo_url ?? "");
  const [logoWidth, setLogoWidth] = useState(String(testimonial?.logo_width ?? ""));
  const [logoHeight, setLogoHeight] = useState(String(testimonial?.logo_height ?? ""));

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput label="Jméno" name="author" required defaultValue={testimonial?.author} />
        <TextInput label="Pozice / firma" name="role" defaultValue={testimonial?.role} />
      </div>
      <TextArea label="Citace" name="quote" rows={4} defaultValue={testimonial?.quote} />
      <ImageField
        label="Logo"
        name="logo_url"
        folder="references"
        value={logoUrl}
        onChange={setLogoUrl}
        onUploaded={(image) => {
          if (!image.width || !image.height) return;
          setLogoWidth(String(image.width));
          setLogoHeight(String(image.height));
        }}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput
          label="Šířka loga (px)"
          name="logo_width"
          type="number"
          min={0}
          value={logoWidth}
          onChange={(event) => setLogoWidth(event.target.value)}
          hint="Vyplní se automaticky po nahrání."
        />
        <TextInput
          label="Výška loga (px)"
          name="logo_height"
          type="number"
          min={0}
          value={logoHeight}
          onChange={(event) => setLogoHeight(event.target.value)}
        />
      </div>
    </div>
  );
}
