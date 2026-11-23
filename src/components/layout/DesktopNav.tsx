"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { CONTACT_LINK, NAV_LINKS } from "@/lib/content/navigation";
import { useNavIndicator } from "@/hooks/useNavIndicator";

interface DesktopNavProps {
  /** Light navbar (dark text) vs dark navbar (white text). */
  isLight: boolean;
  /** Href of the link matching the visitor's position, if any. */
  activeHref: string | null;
}

/**
 * Desktop navigation links with a highlight pill that slides to the hovered
 * link and rests on the active one, plus the contact CTA.
 */
export function DesktopNav({ isLight, activeHref }: DesktopNavProps) {
  const { containerRef, registerItem, highlightedHref, setHoveredHref, rect, visible } =
    useNavIndicator(activeHref);
  const isContactActive = activeHref === CONTACT_LINK.href;

  return (
    <nav
      ref={containerRef}
      onMouseLeave={() => setHoveredHref(null)}
      className="relative hidden items-center gap-1 md:flex"
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute rounded-full transition-all duration-300 ease-out",
          isLight ? "bg-wine/10" : "bg-white/15",
          visible ? "opacity-100" : "opacity-0",
        )}
        style={rect ? { left: rect.left, top: rect.top, width: rect.width, height: rect.height } : undefined}
      />

      {NAV_LINKS.map((link) => {
        const isHighlighted = link.href === highlightedHref;
        return (
          <Link
            key={link.href}
            ref={registerItem(link.href)}
            href={link.href}
            aria-current={link.href === activeHref ? "location" : undefined}
            onMouseEnter={() => setHoveredHref(link.href)}
            onFocus={() => setHoveredHref(link.href)}
            onBlur={() => setHoveredHref(null)}
            className={cn(
              "relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              isLight
                ? isHighlighted ? "text-wine" : "text-wine/70"
                : isHighlighted ? "text-white" : "text-white/80",
            )}
          >
            {link.label}
          </Link>
        );
      })}

      {/* Contact CTA — a filled pill that inverts with the theme. */}
      <Link
        href={CONTACT_LINK.href}
        aria-current={isContactActive ? "location" : undefined}
        className={cn(
          "relative z-10 ml-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors",
          // While the contact section is in view it keeps its hover look.
          isLight
            ? cn("text-cream hover:bg-wine/85", isContactActive ? "bg-wine/85" : "bg-wine")
            : cn("text-white hover:bg-white/40", isContactActive ? "bg-white/40" : "bg-white/25"),
        )}
      >
        {CONTACT_LINK.label}
      </Link>
    </nav>
  );
}
