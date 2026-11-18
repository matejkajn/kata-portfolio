import { Section } from "@/components/layout/Section";
import { HighlightedText } from "@/components/ui/HighlightedText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Reference, SiteSettings } from "@/types";
import { ReferenceCarousel } from "./ReferenceCarousel";

interface ReferencesSectionProps {
  content: SiteSettings["references"];
  references: Reference[];
}

/** "Reference klientů" — testimonials from past clients. */
export function ReferencesSection({ content, references }: ReferencesSectionProps) {
  return (
    <Section id="reference" maxWidth="max-w-[88rem]">
      <SectionHeading
        title={<HighlightedText text={content.heading} />}
        subtitle={content.subtitle}
      />

      <ReferenceCarousel references={references} />
    </Section>
  );
}
