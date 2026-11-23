"use client";

import { usePathname } from "next/navigation";
import { ALL_NAV_LINKS, PORTFOLIO_ROUTE } from "@/lib/content/navigation";
import { useActiveSection } from "./useActiveSection";

const SECTION_IDS = ALL_NAV_LINKS.map((link) => link.sectionId);
const PORTFOLIO_LINK = ALL_NAV_LINKS.find((link) => link.href === PORTFOLIO_ROUTE);

/**
 * The href of the navigation link that matches where the visitor is: on the
 * homepage the section in view, on the portfolio listing and case studies the
 * "Portfolio" link. Null when nothing matches (e.g. over the hero).
 */
export function useActiveNavHref(): string | null {
  const pathname = usePathname();
  const activeSection = useActiveSection(SECTION_IDS);

  if (pathname.startsWith(PORTFOLIO_ROUTE)) return PORTFOLIO_LINK?.href ?? null;
  if (pathname !== "/") return null;
  return ALL_NAV_LINKS.find((link) => link.sectionId === activeSection)?.href ?? null;
}
