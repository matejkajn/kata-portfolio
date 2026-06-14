import Image from "next/image";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { Reference } from "@/types";

interface ReferenceCardProps {
  reference: Reference;
}

/** A single client testimonial: logo, quote and attribution. */
export function ReferenceCard({ reference }: ReferenceCardProps) {
  return (
    <figure className="flex h-full flex-col items-center gap-5 text-center">
      {reference.logoUrl ? (
        <Image
          src={reference.logoUrl}
          alt={`Logo ${reference.author}`}
          width={reference.logoWidth ?? 205}
          height={reference.logoHeight ?? 82}
          className="max-h-6 w-auto object-contain"
        />
      ) : (
        <ImagePlaceholder
          label="logo"
          color="#eef0f4"
          className="h-6 w-16 rounded-md text-ink"
        />
      )}
      <blockquote className="text-sm leading-relaxed text-muted">
        {reference.quote}
      </blockquote>
      <figcaption className="mt-auto">
        <div className="text-sm font-semibold text-ink">
          {reference.author}
        </div>
        <div className="text-xs text-muted">{reference.role}</div>
      </figcaption>
    </figure>
  );
}
