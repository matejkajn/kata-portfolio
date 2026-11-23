import { cn } from "@/lib/cn";
import type { StainLayout } from "@/lib/content/stains";
import { Stain } from "./Stain";

interface StainLayerProps {
  layout: StainLayout;
  className?: string;
}

/** All stains of one layout, filling the parent. */
export function StainLayer({ layout, className }: StainLayerProps) {
  return (
    <div className={cn("absolute inset-0", className)}>
      {layout.stains.map((stain) => (
        <Stain key={stain.id} stain={stain} viewBox={layout.viewBox} blur={layout.blur} />
      ))}
    </div>
  );
}
