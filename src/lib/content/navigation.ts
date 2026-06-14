import type { NavLink } from "@/types";

/** Primary navigation links shown in the navbar and mobile menu. */
export const NAV_LINKS: NavLink[] = [
  { label: "O mně", href: "#o-mne" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Reference", href: "#reference" },
  { label: "Proces", href: "#proces" },
];

/** The contact call-to-action shown as a button at the end of the nav. */
export const CONTACT_LINK: NavLink = { label: "Kontakt", href: "#kontakt" };
