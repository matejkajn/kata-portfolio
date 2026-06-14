"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";
import { CONTACT_LINK, NAV_LINKS } from "@/lib/content/navigation";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useNavIndicator } from "@/hooks/useNavIndicator";
import { useNavTheme } from "@/hooks/useNavTheme";
import { MobileMenu } from "./MobileMenu";

/**
 * Site navigation: a floating pill that adapts to the section behind it —
 * transparent with white text over dark sections, a white card with dark
 * text over light ones. Collapses to a "Menu" overlay on mobile.
 */
export function Navbar() {
  const menu = useDisclosure();
  const { containerRef, registerItem, setActiveHref, rect } = useNavIndicator();
  const detectedTheme = useNavTheme();
  // The mobile overlay is always dark, so force the dark treatment while open.
  const theme = menu.isOpen ? "dark" : detectedTheme;
  const isLight = theme === "light";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6">
      <div className="mx-auto w-full max-w-6xl">
        <div
          className={cn(
            "flex items-center justify-between rounded-full border py-2 pl-6 pr-2 transition-all duration-300",
            isLight
              ? "border-transparent bg-white shadow-lg shadow-brand-dark/10"
              : "border-white/15 bg-white/5 backdrop-blur-md",
          )}
        >
          <Logo variant={isLight ? "dark" : "light"} />

          {/* Desktop navigation */}
          <nav
            ref={containerRef}
            className="relative hidden items-center gap-1 md:flex"
          >
            {/* Sliding highlight that follows the active anchor. */}
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute rounded-full transition-all duration-300 ease-out",
                isLight ? "bg-brand-dark/10" : "bg-white/10",
                rect ? "opacity-100" : "opacity-0",
              )}
              style={
                rect
                  ? {
                      left: rect.left,
                      top: rect.top,
                      width: rect.width,
                      height: rect.height,
                    }
                  : undefined
              }
            />
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                ref={registerItem(link.href)}
                href={link.href}
                onClick={() => setActiveHref(link.href)}
                className={cn(
                  "relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isLight
                    ? "text-brand-dark/80 hover:text-brand-dark"
                    : "text-white/90 hover:text-white",
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Contact CTA — a filled pill that inverts with the theme. */}
            <Link
              href={CONTACT_LINK.href}
              className={cn(
                "relative z-10 ml-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors",
                isLight
                  ? "bg-brand-dark text-white hover:bg-brand-dark/90"
                  : "bg-white text-brand-dark hover:bg-white/90",
              )}
            >
              {CONTACT_LINK.label}
            </Link>
          </nav>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={menu.toggle}
            aria-expanded={menu.isOpen}
            aria-controls="mobile-menu"
            className={cn(
              "rounded-full px-5 py-2 text-sm font-semibold transition-colors md:hidden",
              isLight
                ? "bg-brand-dark text-white hover:bg-brand-dark/90"
                : "bg-white text-brand-dark hover:bg-white/90",
            )}
          >
            {menu.isOpen ? "Zavřít" : "Menu"}
          </button>
        </div>
      </div>

      <MobileMenu isOpen={menu.isOpen} onClose={menu.close} />
    </header>
  );
}
