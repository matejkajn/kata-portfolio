import type { Metadata } from "next";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PortfolioGrid } from "@/components/home/PortfolioGrid";
import { ProjectCta } from "@/components/project/ProjectCta";
import { getSiteSettings } from "@/lib/supabase/content";
import { getProjects } from "@/lib/supabase/projects";

export async function generateMetadata(): Promise<Metadata> {
  const { portfolio } = await getSiteSettings();
  return {
    title: `${portfolio.heading} — Kateřina Hršelová`,
    description: portfolio.subtitle,
  };
}

/** Full portfolio listing — every project, linked from the homepage "Zobrazit více". */
export default async function PortfolioPage() {
  const [settings, projects] = await Promise.all([
    getSiteSettings(),
    getProjects(),
  ]);

  return (
    <>
      <Navbar logoUrl={settings.brand.logoUrl} />
      <main className="flex-1" data-nav-theme="light">
        <div className="mx-auto w-full max-w-7xl px-4 pt-28 pb-20 sm:px-6 md:pt-36 md:pb-28">
          <SectionHeading
            title={settings.portfolio.heading}
            subtitle={settings.portfolio.subtitle}
          />

          <PortfolioGrid projects={projects} />
        </div>

        <ProjectCta content={settings.cta} />
      </main>
      <div data-nav-theme="light">
        <Footer content={settings.footer} brand={settings.brand} />
      </div>
    </>
  );
}
