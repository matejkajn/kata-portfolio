"use client";

import { CarouselDots } from "@/components/ui/CarouselDots";
import { useCarousel } from "@/hooks/useCarousel";
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
        className="scrollbar-none -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-6 overflow-x-auto px-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 pb-10 pt-4 md:gap-12"
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
