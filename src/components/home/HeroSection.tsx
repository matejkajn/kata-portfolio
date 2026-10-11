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
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-medium leading-none tracking-normal text-white sm:text-6xl md:text-[104px]">
          <HighlightedText text={content.title} />
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
          {content.text}
        </p>
        <ButtonLink href="#portfolio" variant="outline" className="mt-2">
          {content.buttonLabel}
        </ButtonLink>
      </div>
    </section>
  );
}
