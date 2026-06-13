import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { PortfolioSection } from "@/components/home/PortfolioSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ReferencesSection } from "@/components/home/ReferencesSection";
import { ContactSection } from "@/components/home/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Shared background spanning the hero + about sections (single image). */}
        <div
          data-nav-theme="dark"
          className="bg-[url('/homepage/background_about.jpg')] bg-cover bg-center bg-no-repeat"
        >
          <HeroSection />
          <AboutSection />
        </div>
        <div data-nav-theme="light">
          <PortfolioSection />
        </div>
        <div data-nav-theme="dark">
          <ProcessSection />
        </div>
        <div data-nav-theme="light">
          <ReferencesSection />
        </div>
        <div data-nav-theme="dark">
          <ContactSection />
        </div>
      </main>
      <div data-nav-theme="light">
        <Footer />
      </div>
    </>
  );
}
