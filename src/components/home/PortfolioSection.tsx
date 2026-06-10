import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FEATURED_PROJECTS } from "@/lib/content/projects";
import { ProjectCard } from "./ProjectCard";

/** "Moje portfolio" — featured project grid with a link to the full list. */
export function PortfolioSection() {
  return (
    <Section id="portfolio">
      <SectionHeading
        title="Moje portfolio"
        subtitle="Ukázky projektů, které ukazují můj tvůrčí přístup a schopnost vytvářet jedinečné vizuální řešení."
      />

      <div className="mt-12 grid grid-cols-2 gap-6 md:gap-8">
        {FEATURED_PROJECTS.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <ButtonLink href="/portfolio">Zobrazit více</ButtonLink>
      </div>
    </Section>
  );
}
