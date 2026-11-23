"use client";

import { useCallback, type MouseEvent } from "react";
import { smoothScrollTo } from "@/lib/smoothScroll";

/**
 * Click handler for in-page anchor links (`#id`) that glides to the target
 * section over `duration` ms. Works on every click, even when the URL already
 * carries that hash. Falls back to normal navigation if the target is missing
 * or the click is modified (new tab etc.).
 */
export function useSmoothAnchorScroll(
  duration = 1200,
): (event: MouseEvent<HTMLAnchorElement>) => void {
  return useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const hash = new URL(event.currentTarget.href).hash;
      const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
      if (!target) return;

      event.preventDefault();
      smoothScrollTo(target.getBoundingClientRect().top + window.scrollY, duration);
    },
    [duration],
  );
}
