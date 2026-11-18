/**
 * Geometry of the homepage background (`homepage background.svg` from the
 * redesign, 1440×1541): a wine canvas with two heavily blurred blue ellipses.
 * Values are copied verbatim from the SVG; only the drift is new.
 */

export const STAIN_VIEWBOX = { width: 1440, height: 1541 } as const;

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

export const STAIN_BLUR = 150;

export const HOMEPAGE_STAINS: StainDef[] = [
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
];
