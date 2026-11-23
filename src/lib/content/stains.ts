/**
 * Geometry of the homepage background: a wine canvas with two heavily blurred
 * blue ellipses. The desktop layout is copied verbatim from the redesign's
 * `homepage background.svg` (1440×1541); the mobile layout re-places the same
 * two stains on a tall, narrow canvas so they stay in view on phones.
 */

export interface StainDef {
  id: string;
  ellipse: { cx: number; cy: number; rx: number; ry: number };
  /** Blue → wine fill gradient, in viewBox units. */
  gradient: { x1: number; y1: number; x2: number; y2: number };
  /** Region the blur may paint into, in viewBox units. */
  filterRegion: { x: number; y: number; width: number; height: number };
  /** Horizontal travel (% of the background width) and timing of the drift. */
  drift: { from: string; to: string; duration: string; delay: string };
}

/** A complete stain backdrop for one breakpoint. */
export interface StainLayout {
  viewBox: { width: number; height: number };
  /** Gaussian blur radius, in viewBox units. */
  blur: number;
  stains: StainDef[];
}

export const HOMEPAGE_STAINS_DESKTOP: StainLayout = {
  viewBox: { width: 1440, height: 1541 },
  blur: 150,
  stains: [
    {
      id: "stain-top-right",
      ellipse: { cx: 1434.5, cy: 444.5, rx: 838.5, ry: 468.5 },
      gradient: { x1: 1522.04, y1: -24.0001, x2: 577.534, y2: 685.538 },
      filterRegion: { x: 296, y: -324, width: 2277, height: 1537 },
      drift: { from: "5%", to: "-60%", duration: "11s", delay: "0s" },
    },
    {
      id: "stain-bottom-left",
      ellipse: { cx: 194, cy: 1163.5, rx: 598, ry: 612.5 },
      gradient: { x1: -458, y1: 1399.5, x2: 892.5, y2: 1229 },
      filterRegion: { x: -704, y: 251, width: 1796, height: 1825 },
      drift: { from: "-5%", to: "65%", duration: "11s", delay: "0s" },
    },
  ],
};

export const HOMEPAGE_STAINS_MOBILE: StainLayout = {
  viewBox: { width: 390, height: 1900 },
  blur: 70,
  stains: [
    {
      id: "stain-mobile-top-right",
      ellipse: { cx: 380, cy: 420, rx: 280, ry: 340 },
      gradient: { x1: 420, y1: 80, x2: 100, y2: 620 },
      filterRegion: { x: -110, y: -130, width: 980, height: 1100 },
      drift: { from: "10%", to: "-45%", duration: "11s", delay: "0s" },
    },
    {
      id: "stain-mobile-bottom-left",
      ellipse: { cx: 10, cy: 1380, rx: 290, ry: 380 },
      gradient: { x1: -280, y1: 1500, x2: 300, y2: 1300 },
      filterRegion: { x: -490, y: 790, width: 1000, height: 1180 },
      drift: { from: "-10%", to: "50%", duration: "11s", delay: "0s" },
    },
  ],
};
