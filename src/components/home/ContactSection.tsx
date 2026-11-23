import Image from "next/image";

import { Section } from "@/components/layout/Section";
import { HighlightedText } from "@/components/ui/HighlightedText";
import type { SiteSettings } from "@/types";
import { ContactForm } from "./ContactForm";

interface ContactSectionProps {
  content: SiteSettings["contact"];
}

/** "Pojďme vytvořit něco výjimečného" — closing call-to-action with form. */
export function ContactSection({ content }: ContactSectionProps) {
  return (
    <Section
      id="kontakt"
      gutter="home"
      maxWidth="max-w-none"
      className="bg-wine-glow rounded-t-[2rem] md:rounded-t-[40px]"
      innerClassName="grid items-center gap-12 md:grid-cols-2"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-normal leading-tight text-cream sm:text-5xl">
            <HighlightedText text={content.heading} />
          </h2>
          <p className="max-w-md text-base leading-relaxed text-white">
            {content.text}
          </p>
        </div>
        <ContactForm successMessage={content.successMessage} />
      </div>

      <Image
        src={content.imageUrl}
        alt={content.imageAlt}
        width={420}
        height={466}
        className="aspect-[4/5] w-full max-w-[420px] justify-self-center rounded-2xl object-cover md:justify-self-end"
      />
    </Section>
  );
}
