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
      maxWidth="max-w-[88rem]"
      innerClassName="grid items-center gap-12 md:grid-cols-2"
    >
      <div className="flex flex-col gap-5">
        <span className="text-sm font-medium text-white/70">{content.label}</span>
        <h2 className="text-3xl font-bold leading-snug tracking-tight text-white sm:text-4xl">
          {content.heading}
        </h2>
        {toParagraphs(content.text).map((paragraph, index) => (
          <p key={index} className="text-base leading-relaxed text-white/75">
            {paragraph}
          </p>
        ))}
      </div>

      <Image
        src={content.imageUrl}
        alt={content.imageAlt}
        width={444}
        height={582}
        className="aspect-[4/5] w-full max-w-[444px] justify-self-center rounded-[40px] object-cover md:justify-self-end"
      />
    </Section>
  );
}
