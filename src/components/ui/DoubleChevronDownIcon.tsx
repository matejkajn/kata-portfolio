import { cn } from "@/lib/cn";

interface DoubleChevronDownIconProps {
  className?: string;
}

/** Decorative double "»" chevron pointing down; inherits colour from the surrounding text. */
export function DoubleChevronDownIcon({ className }: DoubleChevronDownIconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-10", className)}
    >
      {/* Stroke stays a fixed hairline width however large the icon is drawn. */}
      <path d="M6 6l6 6 6-6M6 12l6 6 6-6" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
