import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { PortfolioSection } from "@/components/home/PortfolioSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ReferencesSection } from "@/components/home/ReferencesSection";
import { ContactSection } from "@/components/home/ContactSection";
import {
  getProcessSteps,
  getReferences,
  getSiteSettings,
} from "@/lib/supabase/content";

export default async function Home() {
  const [settings, steps, references] = await Promise.all([
    getSiteSettings(),
    getProcessSteps(),
    getReferences(),
  ]);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Shared background spanning the hero + about sections (single image). */}
        <div
          data-nav-theme="dark"
          className="bg-[url('/homepage/background_about.jpg')] bg-cover bg-center bg-no-repeat"
        >
          <HeroSection content={settings.hero} />
          <AboutSection content={settings.about} />
        </div>
        <div data-nav-theme="light">
          <PortfolioSection content={settings.portfolio} />
        </div>
        <div data-nav-theme="dark">
          <ProcessSection content={settings.process} steps={steps} />
        </div>
        <div data-nav-theme="light">
          <ReferencesSection
            content={settings.references}
            references={references}
          />
        </div>
        <div data-nav-theme="light">
          <ContactSection content={settings.contact} />
        </div>
      </main>
      <div data-nav-theme="light">
        <Footer content={settings.footer} />
      </div>
    </>
  );
}
