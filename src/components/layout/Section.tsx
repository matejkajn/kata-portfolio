import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionProps {
  /** Anchor id used by the navigation links. */
  id?: string;
  /** Extra classes for the outer <section> (e.g. background). */
  className?: string;
  /** Extra classes for the inner centered container. */
  innerClassName?: string;
  /** Tailwind max-width class for the centered container. */
  maxWidth?: string;
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
  maxWidth = "max-w-6xl",
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn("px-6 py-20 sm:px-8 md:py-28", className)}>
      <div className={cn("mx-auto w-full", maxWidth, innerClassName)}>
        {children}
      </div>
    </section>
  );
}
