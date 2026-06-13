"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";

/** Position and size of the sliding highlight, relative to its container. */
interface IndicatorRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface NavIndicator {
  /** Attach to the relative container that wraps the nav items. */
  containerRef: React.RefObject<HTMLElement | null>;
  /** Ref callback to register each nav item by its href. */
  registerItem: (href: string) => (el: HTMLElement | null) => void;
  /** The currently highlighted href, or null when nothing is active. */
  activeHref: string | null;
  /** Highlight a given href (e.g. on click). */
  setActiveHref: (href: string) => void;
  /** Geometry of the highlight for the active item, or null when hidden. */
  rect: IndicatorRect | null;
}

/**
 * Drives a highlight box that slides to the active nav item. Measures the
 * registered item's position relative to the container so the box can be
 * absolutely positioned and animated via CSS transitions.
 */
export function useNavIndicator(initialHref?: string): NavIndicator {
  const containerRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());
  const [activeHref, setActiveHref] = useState<string | null>(
    initialHref ?? null,
  );
  const [rect, setRect] = useState<IndicatorRect | null>(null);

  const registerItem = useCallback(
    (href: string) => (el: HTMLElement | null) => {
      if (el) itemRefs.current.set(href, el);
      else itemRefs.current.delete(href);
    },
    [],
  );

  const measure = useCallback(() => {
    const container = containerRef.current;
    const el = activeHref ? itemRefs.current.get(activeHref) : undefined;
    if (!container || !el) {
      setRect(null);
      return;
    }
    const c = container.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setRect({
      left: r.left - c.left,
      top: r.top - c.top,
      width: r.width,
      height: r.height,
    });
  }, [activeHref]);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  return { containerRef, registerItem, activeHref, setActiveHref, rect };
}
