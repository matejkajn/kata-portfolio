"use client";

import { CarouselDots } from "@/components/ui/CarouselDots";
import { useCarousel } from "@/hooks/useCarousel";
import { cn } from "@/lib/cn";
import { HOME_GUTTER_BLEED } from "@/lib/layout";
import type { Reference } from "@/types";
import { ReferenceCard } from "./ReferenceCard";

interface ReferenceCarouselProps {
  references: Reference[];
}

/**
 * Swipeable row of reference cards — one on phones, two on tablets, three on
 * desktop — with dash indicators for the scroll position.
 */
export function ReferenceCarousel({ references }: ReferenceCarouselProps) {
  const { trackRef, pageCount, activeIndex, scrollToIndex } = useCarousel(references.length);

  return (
    <div className="mt-10">
      {/* Vertical padding leaves room for the card shadows inside the scroll area. */}
      <div
        ref={trackRef}
        className={cn(
          "scrollbar-none flex snap-x snap-mandatory gap-6 overflow-x-auto pb-14 pt-6 md:gap-12",
          HOME_GUTTER_BLEED,
        )}
      >
        {references.map((reference) => (
          <div
            key={reference.id ?? reference.author}
            className="shrink-0 basis-[85%] snap-start sm:basis-[calc((100%-1.5rem)/2)] md:basis-[calc((100%-3rem)/2)] lg:basis-[calc((100%-6rem)/3)]"
          >
            <ReferenceCard reference={reference} />
          </div>
        ))}
      </div>

      <CarouselDots count={pageCount} activeIndex={activeIndex} onSelect={scrollToIndex} />
    </div>
  );
}
