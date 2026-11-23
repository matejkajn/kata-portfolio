import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { HighlightedText } from "@/components/ui/HighlightedText";
import type { SiteSettings } from "@/types";

interface ProjectCtaProps {
  content: SiteSettings["cta"];
}

/**
 * Closing call-to-action banner shown at the foot of a case study. Mirrors the
 * homepage contact heading and links back to its contact section.
 */
export function ProjectCta({ content }: ProjectCtaProps) {
  return (
    <Section gutter="project" maxWidth="max-w-none" className="pt-10 md:pt-10">
      <div className="bg-wine-glow flex flex-col items-center gap-8 rounded-3xl px-6 py-16 text-center sm:py-20">
        <h2 className="max-w-2xl text-3xl font-normal leading-tight text-cream sm:text-5xl">
          <HighlightedText text={content.heading} />
        </h2>
        <ButtonLink href="/#kontakt" variant="glass">
          {content.buttonLabel}
        </ButtonLink>
      </div>
    </Section>
  );
}
