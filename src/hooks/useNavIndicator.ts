"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";

/** Position and size of the sliding highlight, relative to its container. */
interface IndicatorRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

/** A measurement tagged with the item it was taken from. */
interface MeasuredRect extends IndicatorRect {
  href: string;
}

interface NavIndicator {
  /** Attach to the relative container that wraps the nav items. */
  containerRef: React.RefObject<HTMLElement | null>;
  /** Ref callback to register each nav item by its href. */
  registerItem: (href: string) => (el: HTMLElement | null) => void;
  /** The href the highlight currently sits on (hovered, else active). */
  highlightedHref: string | null;
  /** Mark an item as hovered/focused, or null when the pointer leaves. */
  setHoveredHref: (href: string | null) => void;
  /** Last measured geometry of the highlight; kept while hidden so it doesn't jump. */
  rect: IndicatorRect | null;
  /** Whether the highlight should be shown. */
  visible: boolean;
}

/**
 * Drives a highlight box that slides to the hovered nav item, falling back to
 * the active one. Measures the item's position relative to the container so
 * the box can be absolutely positioned and animated via CSS transitions.
 */
export function useNavIndicator(activeHref: string | null): NavIndicator {
  const containerRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [rect, setRect] = useState<MeasuredRect | null>(null);

  const highlightedHref = hoveredHref ?? activeHref;
  const visible = rect !== null && rect.href === highlightedHref;

  const registerItem = useCallback(
    (href: string) => (el: HTMLElement | null) => {
      if (el) itemRefs.current.set(href, el);
      else itemRefs.current.delete(href);
    },
    [],
  );

  const measure = useCallback(() => {
    const container = containerRef.current;
    const target = highlightedHref ? itemRefs.current.get(highlightedHref) : undefined;
    if (!container || !highlightedHref || !target) return;
    const c = container.getBoundingClientRect();
    const r = target.getBoundingClientRect();
    setRect({
      href: highlightedHref,
      left: r.left - c.left,
      top: r.top - c.top,
      width: r.width,
      height: r.height,
    });
  }, [highlightedHref]);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  return { containerRef, registerItem, highlightedHref, setHoveredHref, rect, visible };
}
