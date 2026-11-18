"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

interface UseCarousel {
  /** Attach to the horizontally scrolling track. */
  trackRef: RefObject<HTMLDivElement | null>;
  /** Number of distinct scroll positions (1 when everything fits). */
  pageCount: number;
  /** Index of the current scroll position. */
  activeIndex: number;
  scrollToIndex: (index: number) => void;
}

/** Distance between the starts of two neighbouring items (item width + gap). */
function stepOf(track: HTMLElement): number {
  const [first, second] = Array.from(track.children) as HTMLElement[];
  if (!first) return 0;
  return second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
}

/**
 * State for a native scroll-snap carousel: how many positions it has, which
 * one is showing, and a way to jump to one. Recomputes on scroll and resize,
 * so it follows the responsive number of visible cards.
 */
export function useCarousel(itemCount: number): UseCarousel {
  const trackRef = useRef<HTMLDivElement>(null);
  const [pageCount, setPageCount] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const step = stepOf(track);
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (step <= 0 || maxScroll <= 1) {
      setPageCount(1);
      setActiveIndex(0);
      return;
    }
    const pages = Math.round(maxScroll / step) + 1;
    setPageCount(pages);
    setActiveIndex(Math.min(pages - 1, Math.round(track.scrollLeft / step)));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    measure();
    track.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => {
      track.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, [measure, itemCount]);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * stepOf(track), behavior: "smooth" });
  }, []);

  return { trackRef, pageCount, activeIndex, scrollToIndex };
}
