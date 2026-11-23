"use client";

import { useEffect, useState } from "react";

/**
 * Scroll-spy: returns the id of the section currently crossing the probe line
 * (`probeRatio` of the viewport height from the top), or null when none of the
 * given sections is there (e.g. over the hero, or on pages without them).
 * Picks the last section once the page is scrolled to the bottom, so a short
 * final section can still become active.
 */
export function useActiveSection(
  sectionIds: readonly string[],
  probeRatio = 0.4,
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const idsKey = sectionIds.join(",");

  useEffect(() => {
    const ids = idsKey.split(",").filter(Boolean);
    let frame = 0;

    const update = () => {
      frame = 0;
      const sections = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      const probe = window.innerHeight * probeRatio;

      let next: string | null = null;
      if (atBottom && sections.length > 0) {
        const last = sections.reduce((a, b) =>
          a.getBoundingClientRect().top > b.getBoundingClientRect().top ? a : b,
        );
        if (last.getBoundingClientRect().top < window.innerHeight) next = last.id;
      }
      if (!next) {
        const hit = sections.find((el) => {
          const { top, bottom } = el.getBoundingClientRect();
          return top <= probe && bottom > probe;
        });
        next = hit?.id ?? null;
      }
      setActiveId(next);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [idsKey, probeRatio]);

  return activeId;
}
