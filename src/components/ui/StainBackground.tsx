import { HOMEPAGE_STAINS, type StainDef } from "@/lib/content/stains";
import { Stain } from "./Stain";

interface StainBackgroundProps {
  stains?: StainDef[];
}

/**
 * Animated wine-and-blue backdrop. Fills its nearest positioned ancestor and
 * sits behind its content — give the parent `relative isolate overflow-hidden`
 * and the base colour (`bg-wine`).
 */
export function StainBackground({ stains = HOMEPAGE_STAINS }: StainBackgroundProps) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {stains.map((stain) => (
        <Stain key={stain.id} stain={stain} />
      ))}
    </div>
  );
}
