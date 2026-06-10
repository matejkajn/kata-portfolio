"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";
import { CONTACT_LINK, NAV_LINKS } from "@/lib/content/navigation";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useScrolled } from "@/hooks/useScrolled";
import { MobileMenu } from "./MobileMenu";

/**
 * Site navigation: transparent over the hero, gaining a solid indigo
 * background once scrolled. Collapses to a "Menu" overlay on mobile.
 */
export function Navbar() {
  const scrolled = useScrolled();
  const menu = useDisclosure();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || menu.isOpen
          ? "bg-brand-dark/95 backdrop-blur"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <Logo className="text-white" />

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/85 transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={CONTACT_LINK.href}
            className="rounded-full bg-white/15 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-white/25"
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
          className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/25 md:hidden"
        >
          {menu.isOpen ? "Zavřít" : "Menu"}
        </button>
      </div>

      <MobileMenu isOpen={menu.isOpen} onClose={menu.close} />
    </header>
  );
}
