import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { REFERENCES } from "@/lib/content/references";
import { ReferenceCard } from "./ReferenceCard";

/** "Reference klientů" — testimonials from past clients. */
export function ReferencesSection() {
  return (
    <Section id="reference" maxWidth="max-w-[88rem]">
      <SectionHeading
        title="Reference klientů"
        subtitle="Co říkají moji spokojení klienti o naší spolupráci."
      />

      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {REFERENCES.map((reference) => (
          <ReferenceCard key={reference.author} reference={reference} />
        ))}
      </div>
    </Section>
  );
}
