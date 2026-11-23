import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { GUTTERS, type Gutter } from "@/lib/layout";

interface SectionProps {
  /** Anchor id used by the navigation links. */
  id?: string;
  /** Extra classes for the outer <section> (e.g. background). */
  className?: string;
  /** Extra classes for the inner centered container. */
  innerClassName?: string;
  /** Tailwind max-width class for the centered container. */
  maxWidth?: string;
  /** Horizontal page gutter for the section. */
  gutter?: Gutter;
  children: ReactNode;
}

/**
 * Page section wrapper: full-bleed background with a centered, max-width,
 * horizontally-padded content container.
 */
export function Section({
  id,
  className,
  innerClassName,
  maxWidth = "max-w-7xl",
  gutter = "default",
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn("py-20 md:py-28", GUTTERS[gutter], className)}>
      <div className={cn("mx-auto w-full", maxWidth, innerClassName)}>
        {children}
      </div>
    </section>
  );
}
