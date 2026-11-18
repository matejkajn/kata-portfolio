import type { CSSProperties } from "react";

import type { ThemeColors } from "@/types";

/** CSS custom property backing each palette colour (see `globals.css`). */
const CSS_VARIABLES: Record<keyof ThemeColors, `--color-${string}`> = {
  wine: "--color-wine",
  wineLight: "--color-wine-light",
  stain: "--color-stain",
  navy: "--color-navy",
  accent: "--color-accent",
  cream: "--color-cream",
  blush: "--color-blush",
  ink: "--color-ink",
  muted: "--color-muted",
};

const HEX_COLOR = /^#[0-9a-f]{6}$/i;

/** True for a `#rrggbb` hex colour — the only format the palette stores. */
export function isHexColor(value: unknown): value is string {
  return typeof value === "string" && HEX_COLOR.test(value);
}

/**
 * Inline style that overrides the Tailwind theme variables with the saved
 * palette. Applied on `<html>`, so every `bg-wine`, `text-navy/50`… follows it.
 */
export function themeStyle(theme: ThemeColors): CSSProperties {
  const style: Record<string, string> = {};
  for (const key of Object.keys(CSS_VARIABLES) as Array<keyof ThemeColors>) {
    style[CSS_VARIABLES[key]] = theme[key];
  }
  return style as CSSProperties;
}
