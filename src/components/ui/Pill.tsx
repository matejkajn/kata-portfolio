import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface PillProps {
  children: ReactNode;
  className?: string;
}

/** A small rounded label, e.g. the "Analýza"/"Návrh" process tags. */
export function Pill({ children, className }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full border-2 border-blush px-6 py-2 text-center font-heading text-xl font-light text-blush md:text-[28px] md:leading-9",
        className,
      )}
    >
      {children}
    </span>
  );
}
