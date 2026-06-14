import type { Metadata } from "next";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PortfolioGrid } from "@/components/home/PortfolioGrid";
import { ProjectCta } from "@/components/project/ProjectCta";
import { getProjects } from "@/lib/supabase/projects";

export const metadata: Metadata = {
  title: "Portfolio — Kateřina Hršelová",
  description:
    "Ukázky projektů, které ukazují můj tvůrčí přístup a schopnost vytvářet jedinečné vizuální řešení.",
};

/** Full portfolio listing — every project, linked from the homepage "Zobrazit více". */
export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <>
      <Navbar />
      <main className="flex-1" data-nav-theme="light">
        <div className="mx-auto w-full max-w-6xl px-6 pt-28 pb-20 sm:px-8 md:pt-36 md:pb-28">
          <SectionHeading
            title="Moje portfolio"
            subtitle="Ukázky projektů, které ukazují můj tvůrčí přístup a schopnost vytvářet jedinečné vizuální řešení."
          />

          <PortfolioGrid projects={projects} />
        </div>

        <ProjectCta />
      </main>
      <div data-nav-theme="light">
        <Footer />
      </div>
    </>
  );
}
