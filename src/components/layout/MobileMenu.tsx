"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { CONTACT_LINK, NAV_LINKS } from "@/lib/content/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Full-screen navigation overlay shown on mobile (see menu_mobil design).
 */
export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <div
      id="mobile-menu"
      className={cn(
        "fixed inset-0 z-40 bg-brand-gradient transition-opacity duration-200 md:hidden",
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
            className="text-2xl font-medium text-white/90 transition-colors hover:text-accent"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href={CONTACT_LINK.href}
          onClick={onClose}
          className="rounded-full bg-white/15 px-8 py-2.5 text-2xl font-medium text-white transition-colors hover:bg-white/25"
        >
          {CONTACT_LINK.label}
        </Link>
      </nav>
    </div>
  );
}
