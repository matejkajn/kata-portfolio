import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProjects } from "@/lib/supabase/projects";
import { PortfolioGrid } from "./PortfolioGrid";

/** How many projects to feature on the homepage before linking to the full listing. */
const FEATURED_COUNT = 4;

/** "Moje portfolio" — featured project grid that links to the full listing. */
export async function PortfolioSection() {
  const projects = await getProjects();
  const featured = projects.slice(0, FEATURED_COUNT);
  const hasMore = projects.length > FEATURED_COUNT;

  return (
    <Section id="portfolio" maxWidth="max-w-7xl">
      <SectionHeading
        title="Moje portfolio"
        subtitle="Ukázky projektů, které ukazují můj tvůrčí přístup a schopnost vytvářet jedinečné vizuální řešení."
      />

      <PortfolioGrid
        projects={featured}
        moreHref={hasMore ? "/portfolio" : undefined}
      />
    </Section>
  );
}
