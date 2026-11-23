import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { HighlightedText } from "@/components/ui/HighlightedText";
import { cn } from "@/lib/cn";
import type { Gutter } from "@/lib/layout";
import type { SiteSettings } from "@/types";

interface ProjectCtaProps {
  content: SiteSettings["cta"];
  /** Horizontal page gutter, matching the page the banner closes. */
  gutter?: Gutter;
  /** Pull the footer closer with a tighter gap below the banner. */
  tightBottom?: boolean;
}

/**
 * Closing call-to-action banner shown at the foot of a case study. Mirrors the
 * homepage contact heading and links back to its contact section.
 */
export function ProjectCta({
  content,
  gutter = "project",
  tightBottom = false,
}: ProjectCtaProps) {
  return (
    <Section
      gutter={gutter}
      maxWidth="max-w-none"
      className={cn("pt-10 md:pt-10", tightBottom && "pb-10 md:pb-10")}
    >
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
