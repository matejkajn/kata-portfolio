import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Closing call-to-action banner shown at the foot of a case study. Mirrors the
 * homepage contact heading and links back to its contact section.
 */
export function ProjectCta() {
  return (
    <Section>
      <div className="relative isolate overflow-hidden rounded-3xl">
        <Image
          src="/footer/cta.png"
          alt=""
          fill
          sizes="(min-width: 1280px) 1216px, 100vw"
          className="-z-10 object-cover"
        />
        <div className="flex flex-col items-center gap-8 px-6 py-16 text-center sm:py-20">
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Pojďme vytvořit něco <span className="text-accent">výjimečného</span>
          </h2>
          <ButtonLink href="/#kontakt" variant="accent">
            Kontakt
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
