import { cn } from "@/lib/cn";

interface CloseIconProps {
  className?: string;
}

/** Decorative "×" icon; inherits colour from the surrounding text. */
export function CloseIcon({ className }: CloseIconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      className={cn("size-5", className)}
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
