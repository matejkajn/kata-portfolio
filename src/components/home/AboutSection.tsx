import Image from "next/image";

import { Section } from "@/components/layout/Section";
import { toParagraphs } from "@/lib/text";
import type { SiteSettings } from "@/types";

interface AboutSectionProps {
  content: SiteSettings["about"];
}

/** "O mně" — introduction and portrait. */
export function AboutSection({ content }: AboutSectionProps) {
  return (
    <Section
      id="o-mne"
      maxWidth="max-w-[96rem]"
      innerClassName="grid items-center gap-12 md:grid-cols-2"
    >
      <div className="flex flex-col gap-5">
        <span className="text-base text-white">{content.label}</span>
        <h2 className="max-w-lg text-3xl font-normal leading-tight text-cream sm:text-5xl">
          {content.heading}
        </h2>
        {toParagraphs(content.text).map((paragraph, index) => (
          <p key={index} className="max-w-lg text-base leading-relaxed text-white/90">
            {paragraph}
          </p>
        ))}
      </div>

      <Image
        src={content.imageUrl}
        alt={content.imageAlt}
        width={560}
        height={582}
        className="aspect-[56/58] w-full max-w-[560px] justify-self-center rounded-[40px] object-cover md:justify-self-end"
      />
    </Section>
  );
}
