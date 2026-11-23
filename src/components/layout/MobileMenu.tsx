"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { CONTACT_LINK, NAV_LINKS } from "@/lib/content/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  /** Href of the link matching the visitor's position, if any. */
  activeHref: string | null;
}

/**
 * Full-screen navigation overlay shown on mobile (see menu_mobil design).
 */
export function MobileMenu({ isOpen, onClose, activeHref }: MobileMenuProps) {
  return (
    <div
      id="mobile-menu"
      className={cn(
        "fixed inset-0 z-40 bg-wine-gradient transition-opacity duration-200 md:hidden",
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
      )}
      aria-hidden={!isOpen}
    >
      <nav className="flex h-full flex-col items-center justify-center gap-8">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            aria-current={link.href === activeHref ? "location" : undefined}
            className={cn(
              "text-2xl font-medium transition-colors hover:text-accent",
              link.href === activeHref ? "text-accent" : "text-white/90",
            )}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href={CONTACT_LINK.href}
          onClick={onClose}
          aria-current={CONTACT_LINK.href === activeHref ? "location" : undefined}
          className={cn(
            "rounded-full px-8 py-2.5 text-2xl font-medium text-white transition-colors hover:bg-white/25",
            CONTACT_LINK.href === activeHref ? "bg-white/25" : "bg-white/15",
          )}
        >
          {CONTACT_LINK.label}
        </Link>
      </nav>
    </div>
  );
}
