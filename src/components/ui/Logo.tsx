import Link from "next/link";
import { cn } from "@/lib/cn";

interface LogoProps {
  /** Tailwind text-color class for the mark, e.g. "text-white". */
  className?: string;
  /** Accessible label / link target. Defaults to the homepage. */
  href?: string;
}

/**
 * The "KH" monogram (Kateřina Hršelová), rendered in the brand serif.
 */
export function Logo({ className, href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="Kateřina Hršelová — domů"
      className={cn(
        "font-serif text-2xl font-bold tracking-tight",
        className ?? "text-brand-dark",
      )}
    >
      KH
    </Link>
  );
}
