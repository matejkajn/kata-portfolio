"use client";

import { useEffect, useState } from "react";

/** Visual theme the navbar adopts based on the section behind it. */
export type NavTheme = "light" | "dark";

/**
 * Tracks which background sits behind the fixed navbar and returns the theme
 * the navbar should adopt. Sections opt in by setting a `data-nav-theme`
 * attribute; the section crossing `probeY` (the navbar's vertical centre)
 * wins. Defaults to "dark".
 */
export function useNavTheme(probeY = 48): NavTheme {
  const [theme, setTheme] = useState<NavTheme>("dark");

  useEffect(() => {
    const update = () => {
      const sections =
        document.querySelectorAll<HTMLElement>("[data-nav-theme]");
      let next: NavTheme = "dark";
      for (const section of sections) {
        const { top, bottom } = section.getBoundingClientRect();
        if (top <= probeY && bottom > probeY) {
          next = section.dataset.navTheme === "light" ? "light" : "dark";
          break;
        }
      }
      setTheme(next);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [probeY]);

  return theme;
}
