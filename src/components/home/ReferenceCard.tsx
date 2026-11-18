import type { Reference } from "@/types";
import { ReferenceAvatar } from "./ReferenceAvatar";
import { StarRating } from "./StarRating";

interface ReferenceCardProps {
  reference: Reference;
}

/** A client testimonial: dark header with portrait and attribution, rating badge, quote. */
export function ReferenceCard({ reference }: ReferenceCardProps) {
  return (
    <article className="flex h-full flex-col rounded-xl bg-cream shadow-[0_24px_48px_-28px_color-mix(in_oklab,var(--color-wine)_55%,transparent)]">
      <header className="relative rounded-xl bg-wine px-5 pb-16 pt-5 text-blush">
        <div className="flex items-start gap-5 sm:gap-6">
          <ReferenceAvatar name={reference.author} photoUrl={reference.photoUrl} />
          <div className="min-w-0 pt-5">
            <h3 className="text-lg font-semibold text-blush sm:text-xl">{reference.author}</h3>
            {reference.role && (
              <p className="mt-2 text-sm leading-snug text-blush/85">{reference.role}</p>
            )}
            {reference.company && (
              <p className="text-sm leading-snug text-blush/85">{reference.company}</p>
            )}
          </div>
        </div>
        <StarRating
          rating={reference.rating}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
        />
      </header>

      <blockquote className="flex-1 px-6 pb-12 pt-14 text-center text-base leading-relaxed text-ink sm:px-8">
        {reference.quote}
      </blockquote>
    </article>
  );
}
