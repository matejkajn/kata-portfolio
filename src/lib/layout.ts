/**
 * Horizontal page gutters. Mobile keeps a compact gutter; from `md` up each
 * page type uses the side margin from the designs.
 */
export const GUTTERS = {
  default: "px-4 sm:px-6",
  home: "px-4 sm:px-6 md:px-[70px]",
  project: "px-4 sm:px-6 md:px-[38px]",
} as const;

export type Gutter = keyof typeof GUTTERS;

/**
 * Lets a horizontal scroller inside a homepage section bleed to the viewport
 * edges while its items still line up with the home gutter.
 */
export const HOME_GUTTER_BLEED =
  "-mx-4 px-4 scroll-px-4 sm:-mx-6 sm:px-6 sm:scroll-px-6 md:-mx-[70px] md:px-[70px] md:scroll-px-[70px]";
