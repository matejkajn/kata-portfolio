import { ButtonLink } from "@/components/ui/Button";
import { HighlightedText } from "@/components/ui/HighlightedText";
import type { SiteSettings } from "@/types";

interface HeroSectionProps {
  content: SiteSettings["hero"];
}

/** Landing hero with the headline, intro copy and a portfolio CTA. */
export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="px-6 pb-24 pt-36 sm:px-8 md:pb-32 md:pt-44">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
        <h1 className="text-5xl font-medium leading-[1.05] tracking-normal text-white sm:text-7xl md:text-[104px] md:leading-none">
          <HighlightedText text={content.title} />
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-white/90 sm:text-xl">
          {content.text}
        </p>
        <ButtonLink href="#portfolio" variant="glass" className="mt-2 px-12 py-3 text-xl">
          {content.buttonLabel}
        </ButtonLink>
      </div>
    </section>
  );
}
