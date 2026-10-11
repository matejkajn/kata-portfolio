import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProjects } from "@/lib/supabase/projects";
import type { SiteSettings } from "@/types";
import { PortfolioGrid } from "./PortfolioGrid";

interface PortfolioSectionProps {
  content: SiteSettings["portfolio"];
}

/** "Moje portfolio" — featured project grid that links to the full listing. */
export async function PortfolioSection({ content }: PortfolioSectionProps) {
  const projects = await getProjects();
  const featured = projects.slice(0, content.featuredCount);
  const hasMore = projects.length > content.featuredCount;

  return (
    <Section id="portfolio" maxWidth="max-w-[88rem]">
      <SectionHeading
        title={content.heading}
        subtitle={content.subtitle}
      />

      <PortfolioGrid
        projects={featured}
        moreHref={hasMore ? "/portfolio" : undefined}
        moreLabel={content.moreLabel}
      />
    </Section>
  );
}
