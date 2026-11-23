import type { CSSProperties } from "react";

import type { StainDef, StainLayout } from "@/lib/content/stains";

interface StainProps {
  stain: StainDef;
  viewBox: StainLayout["viewBox"];
  blur: number;
}

/**
 * One blurred blue ellipse of the gradient background, on its own full-size
 * SVG layer. The whole layer drifts sideways with a CSS transform, so the
 * browser blurs it once and then just moves the composited bitmap.
 *
 * `slice` scales the artwork like `background-size: cover`; `overflow:
 * visible` lets the blur extend past the viewBox so no hard edge shows when
 * the layer moves (the parent clips it).
 */
export function Stain({ stain, viewBox, blur }: StainProps) {
  const { id, ellipse, gradient, filterRegion, drift } = stain;
  const style = {
    "--drift-from": drift.from,
    "--drift-to": drift.to,
    animationDuration: drift.duration,
    animationDelay: drift.delay,
  } as CSSProperties;

  return (
    <svg
      viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
      preserveAspectRatio="xMidYMid slice"
      overflow="visible"
      className="absolute inset-0 size-full animate-stain-drift will-change-transform motion-reduce:animate-none"
      style={style}
    >
      <defs>
        <filter
          id={`${id}-blur`}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
          {...filterRegion}
        >
          <feGaussianBlur stdDeviation={blur} />
        </filter>
        <linearGradient id={`${id}-fill`} gradientUnits="userSpaceOnUse" {...gradient}>
          <stop style={{ stopColor: "var(--color-stain)" }} />
          <stop offset="1" style={{ stopColor: "var(--color-wine)" }} />
        </linearGradient>
      </defs>
      <ellipse {...ellipse} fill={`url(#${id}-fill)`} filter={`url(#${id}-blur)`} />
    </svg>
  );
}
