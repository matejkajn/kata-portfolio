import { ButtonLink } from "@/components/ui/Button";
import { HighlightedText } from "@/components/ui/HighlightedText";
import { cn } from "@/lib/cn";
import { GUTTERS } from "@/lib/layout";
import type { SiteSettings } from "@/types";

interface HeroSectionProps {
  content: SiteSettings["hero"];
}

/** Landing hero with the headline, intro copy and a portfolio CTA. */
export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className={cn("min-h-svh pb-24 pt-36 md:pb-32 md:pt-[234px]", GUTTERS.home)}>
      {/* Content block is 1046×432 at the 1440px design width. */}
      <div className="mx-auto flex max-w-[1046px] flex-col items-center gap-6 text-center md:gap-7">
        {/* 128px at the 1440px design width, scaling down proportionally on narrower screens. */}
        <h1 className="text-5xl font-medium leading-[1.05] tracking-normal text-white sm:text-7xl md:text-[min(128px,8.889vw)] md:leading-none">
          <HighlightedText text={content.title} />
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-white/90 sm:text-xl md:max-w-[880px] md:text-2xl md:leading-[30px]">
          {content.text}
        </p>
        <ButtonLink href="#portfolio" variant="glass" className="mt-2 px-12 py-3 text-xl md:mt-0 md:py-3.5 md:text-2xl">
          {content.buttonLabel}
        </ButtonLink>
      </div>
    </section>
  );
}
