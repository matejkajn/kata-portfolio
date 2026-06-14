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
        "inline-flex items-center justify-center rounded-full border border-accent px-5 py-1.5 text-center text-base font-medium text-accent",
        className,
      )}
    >
      {children}
    </span>
  );
}
