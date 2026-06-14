import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROCESS_STEPS } from "@/lib/content/process";
import { ProcessStep } from "./ProcessStep";

/** "Jak probíhá kreativní proces" — alternating timeline of the four steps. */
export function ProcessSection() {
  return (
    <Section
      id="proces"
      maxWidth="max-w-7xl"
      className="bg-[url('/homepage/background2.jpg')] bg-cover bg-center bg-no-repeat"
    >
      <SectionHeading
        inverted
        title={
          <>
            Jak probíhá{" "}
            <span className="text-accent">společný kreativní proces</span>?
          </>
        }
        subtitle="Provedu vás celou spoluprací krok za krokem — od prvního setkání až po předání hotových materiálů."
      />

      <div className="relative mt-16 overflow-x-clip">
        {/* Timeline spine: left on mobile, centered on desktop. */}
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-px bg-white/25 md:left-1/2 md:-translate-x-1/2"
        />
        <ol className="flex flex-col gap-12">
          {PROCESS_STEPS.map((step, i) => (
            <ProcessStep
              key={step.label}
              step={step}
              side={i % 2 === 0 ? "left" : "right"}
            />
          ))}
        </ol>
      </div>
    </Section>
  );
}
