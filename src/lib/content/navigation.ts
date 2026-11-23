import type { NavLink } from "@/types";

/**
 * Primary navigation links shown in the navbar and mobile menu.
 *
 * The section links are root-relative (`/#…`) so they resolve to the homepage
 * anchors from any page — on the homepage they scroll in place, elsewhere they
 * navigate home and then scroll. "Portfolio" points at the dedicated listing page.
 */
export const NAV_LINKS: NavLink[] = [
  { label: "O mně", href: "/#o-mne", sectionId: "o-mne" },
  { label: "Portfolio", href: "/portfolio", sectionId: "portfolio" },
  { label: "Proces", href: "/#proces", sectionId: "proces" },
  { label: "Reference", href: "/#reference", sectionId: "reference" },
];

/** The contact call-to-action shown as a button at the end of the nav. */
export const CONTACT_LINK: NavLink = { label: "Kontakt", href: "/#kontakt", sectionId: "kontakt" };

/** Every navigation target, in nav order (section links + contact CTA). */
export const ALL_NAV_LINKS: NavLink[] = [...NAV_LINKS, CONTACT_LINK];

/** Listing route whose pages keep the "Portfolio" link active. */
export const PORTFOLIO_ROUTE = "/portfolio";
