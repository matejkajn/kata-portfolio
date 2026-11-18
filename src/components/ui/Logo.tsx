import Link from "next/link";
import { cn } from "@/lib/cn";
import { LogoImage } from "./LogoImage";

interface LogoProps {
  /** Logo URL from site settings; empty falls back to the built-in monogram. */
  src?: string;
  /**
   * "dark" renders the logo as-is (light backgrounds);
   * "light" inverts it to white for dark backgrounds.
   */
  variant?: "dark" | "light";
  /** Extra classes for the link wrapper. */
  className?: string;
  /** Extra classes for the logo image (e.g. to override its height). */
  imageClassName?: string;
  /** Accessible label / link target. Defaults to the homepage. */
  href?: string;
}

/**
 * The site logo (by default the "KH" monogram), linking to the homepage.
 */
export function Logo({
  src,
  variant = "dark",
  className,
  imageClassName = "h-9 w-auto",
  href = "/",
}: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="Kateřina Hršelová — domů"
      className={cn("inline-flex", className)}
    >
      <LogoImage src={src} variant={variant} className={imageClassName} priority />
    </Link>
  );
}
