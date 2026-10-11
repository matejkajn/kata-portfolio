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
      maxWidth="max-w-[88rem]"
      innerClassName="grid items-center gap-12 overflow-hidden rounded-[2.5rem] bg-[url('/homepage/background3.png')] bg-cover bg-center bg-no-repeat px-8 py-14 md:grid-cols-2 md:px-16 md:py-20"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <HighlightedText text={content.heading} />
          </h2>
          <p className="max-w-md text-base leading-relaxed text-white/75">
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
        className="aspect-[4/5] w-full rounded-2xl object-cover"
      />
    </Section>
  );
}
