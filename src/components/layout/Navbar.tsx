"use client";

import { CloseIcon } from "@/components/ui/CloseIcon";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useActiveNavHref } from "@/hooks/useActiveNavHref";
import { useNavTheme } from "@/hooks/useNavTheme";
import { DesktopNav } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";

/**
 * Site navigation: a floating pill that adapts to the section behind it —
 * transparent with white text over dark sections, a white card with dark
 * text over light ones. Collapses to a "Menu" overlay on mobile.
 */
interface NavbarProps {
  /** Logo URL from site settings. */
  logoUrl?: string;
}

export function Navbar({ logoUrl }: NavbarProps) {
  const menu = useDisclosure();
  const activeHref = useActiveNavHref();
  const detectedTheme = useNavTheme();
  // The mobile overlay is always dark, so force the dark treatment while open.
  const theme = menu.isOpen ? "dark" : detectedTheme;
  const isLight = theme === "light";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6">
      {/* Sits above the mobile overlay (z-40) so the close toggle stays tappable. */}
      <div className="relative z-50 mx-auto w-full max-w-3xl">
        <div
          className={cn(
            "flex items-center justify-between rounded-full border py-2 pl-6 pr-2 transition-all duration-300",
            isLight
              ? "border-transparent bg-white shadow-lg shadow-wine/10"
              : "border-white/10 bg-wine/60 shadow-lg shadow-black/20 backdrop-blur-md",
          )}
        >
          <Logo src={logoUrl} variant={isLight ? "dark" : "light"} />

          <DesktopNav isLight={isLight} activeHref={activeHref} />

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={menu.toggle}
            aria-expanded={menu.isOpen}
            aria-controls="mobile-menu"
            aria-label={menu.isOpen ? "Zavřít menu" : "Otevřít menu"}
            className={cn(
              "flex h-9 items-center justify-center rounded-full text-sm font-semibold transition-colors md:hidden",
              menu.isOpen ? "w-9" : "px-5",
              isLight
                ? "bg-wine text-cream hover:bg-wine/90"
                : "bg-white/25 text-white hover:bg-white/35",
            )}
          >
            {menu.isOpen ? <CloseIcon /> : "Menu"}
          </button>
        </div>
      </div>

      <MobileMenu isOpen={menu.isOpen} onClose={menu.close} activeHref={activeHref} />
    </header>
  );
}
