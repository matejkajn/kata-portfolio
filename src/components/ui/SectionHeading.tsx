import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  title: ReactNode;
  subtitle?: ReactNode;
  /** Render light text on dark backgrounds. */
  inverted?: boolean;
  /** Center the heading block. */
  centered?: boolean;
  className?: string;
}

/** Section title + optional subtitle, shared across homepage sections. */
export function SectionHeading({
  title,
  subtitle,
  inverted = false,
  centered = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        centered && "items-center text-center",
        className,
      )}
    >
      <h2
        className={cn(
          "text-3xl font-medium leading-tight sm:text-5xl",
          inverted ? "text-cream" : "text-navy",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "max-w-xl text-base leading-relaxed",
            inverted ? "text-cream/90" : "text-ink",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
