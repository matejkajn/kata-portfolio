import { Section } from "@/components/layout/Section";
import { HighlightedText } from "@/components/ui/HighlightedText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ProcessStep as ProcessStepType, SiteSettings } from "@/types";
import { ProcessStep } from "./ProcessStep";

interface ProcessSectionProps {
  content: SiteSettings["process"];
  steps: ProcessStepType[];
}

/** "Jak probíhá kreativní proces" — alternating timeline of the process steps. */
export function ProcessSection({ content, steps }: ProcessSectionProps) {
  return (
    <Section
      id="proces"
      maxWidth="max-w-[88rem]"
      className="bg-[url('/homepage/background2.jpg')] bg-cover bg-center bg-no-repeat"
    >
      <SectionHeading
        inverted
        title={<HighlightedText text={content.heading} />}
        subtitle={content.subtitle}
      />

      <div className="relative mt-16 overflow-x-clip">
        {/* Timeline spine: left on mobile, centered on desktop. */}
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-px bg-white/25 md:left-1/2 md:-translate-x-1/2"
        />
        <ol className="flex flex-col gap-12">
          {steps.map((step, i) => (
            <ProcessStep
              key={step.id ?? step.label}
              step={step}
              side={i % 2 === 0 ? "left" : "right"}
            />
          ))}
        </ol>
      </div>
    </Section>
  );
}
