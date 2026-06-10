import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { Reference } from "@/types";

interface ReferenceCardProps {
  reference: Reference;
}

/** A single client testimonial: logo, quote and attribution. */
export function ReferenceCard({ reference }: ReferenceCardProps) {
  return (
    <figure className="flex flex-col items-center gap-5 text-center">
      <ImagePlaceholder
        label="logo"
        color="#eef0f4"
        className="h-12 w-28 rounded-md text-ink"
      />
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
