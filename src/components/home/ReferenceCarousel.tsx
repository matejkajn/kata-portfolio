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
      {/* Vertical padding leaves room for the card shadows inside the scroll area.
          The two shared rows (header, quote) are inherited by every card through
          subgrid, so all wine headers end on the same line. */}
      <div
        ref={trackRef}
        className={cn(
          "scrollbar-none grid grid-flow-col grid-rows-[auto_1fr] auto-cols-[85%] gap-x-6 snap-x snap-mandatory overflow-x-auto pb-14 pt-6 sm:auto-cols-[calc((100%-1.5rem)/2)] md:auto-cols-[calc((100%-3rem)/2)] md:gap-x-12 lg:auto-cols-[calc((100%-6rem)/3)]",
          HOME_GUTTER_BLEED,
        )}
      >
        {references.map((reference) => (
          <ReferenceCard
            key={reference.id ?? reference.author}
            reference={reference}
            className="row-span-2 snap-start"
          />
        ))}
      </div>

      <CarouselDots count={pageCount} activeIndex={activeIndex} onSelect={scrollToIndex} />
    </div>
  );
}
