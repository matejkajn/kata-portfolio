import {
  HOMEPAGE_STAINS_DESKTOP,
  HOMEPAGE_STAINS_MOBILE,
  type StainLayout,
} from "@/lib/content/stains";
import { StainLayer } from "./StainLayer";

interface StainBackgroundProps {
  desktop?: StainLayout;
  mobile?: StainLayout;
}

/**
 * Animated wine-and-blue backdrop. Fills its nearest positioned ancestor and
 * sits behind its content — give the parent `relative isolate overflow-hidden`
 * and the base colour (`bg-wine`). Phones get their own layout, because the
 * wide desktop artwork would be cropped down to its empty centre.
 */
export function StainBackground({
  desktop = HOMEPAGE_STAINS_DESKTOP,
  mobile = HOMEPAGE_STAINS_MOBILE,
}: StainBackgroundProps) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <StainLayer layout={mobile} className="md:hidden" />
      <StainLayer layout={desktop} className="hidden md:block" />
    </div>
  );
}
