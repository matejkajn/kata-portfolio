import { Section } from "@/components/layout/Section";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ContactForm } from "./ContactForm";

/** "Pojďme vytvořit něco výjimečného" — closing call-to-action with form. */
export function ContactSection() {
  return (
    <Section
      id="kontakt"
      className="bg-brand-gradient"
      innerClassName="grid items-center gap-12 md:grid-cols-2"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Pojďme vytvořit něco{" "}
            <span className="text-accent">výjimečného</span>
          </h2>
          <p className="max-w-md text-base leading-relaxed text-white/75">
            Máte projekt, který čeká na kreativní zpracování? Nebojte se mě
            kontaktovat.
          </p>
        </div>
        <ContactForm />
      </div>

      <ImagePlaceholder
        color="#1f2228"
        className="aspect-square w-full rounded-2xl"
      />
    </Section>
  );
}
