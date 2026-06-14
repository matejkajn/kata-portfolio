import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProjects } from "@/lib/supabase/projects";
import { PortfolioGrid } from "./PortfolioGrid";

/** "Moje portfolio" — featured project grid that reveals all projects on demand. */
export async function PortfolioSection() {
  const projects = await getProjects();

  return (
    <Section id="portfolio">
      <SectionHeading
        title="Moje portfolio"
        subtitle="Ukázky projektů, které ukazují můj tvůrčí přístup a schopnost vytvářet jedinečné vizuální řešení."
      />

      <PortfolioGrid projects={projects} />
    </Section>
  );
}
