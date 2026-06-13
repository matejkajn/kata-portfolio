import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface LogoProps {
  /**
   * "dark" renders the navy monogram as-is (light backgrounds);
   * "light" inverts it to white for dark backgrounds.
   */
  variant?: "dark" | "light";
  /** Extra classes for the link wrapper. */
  className?: string;
  /** Accessible label / link target. Defaults to the homepage. */
  href?: string;
}

/**
 * The "KH" monogram (Kateřina Hršelová) logo, linking to the homepage.
 */
export function Logo({ variant = "dark", className, href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="Kateřina Hršelová — domů"
      className={cn("inline-flex", className)}
    >
      <Image
        src="/homepage/logo.png"
        alt=""
        width={120}
        height={76}
        priority
        className={cn(
          "h-9 w-auto",
          variant === "light" && "brightness-0 invert",
        )}
      />
    </Link>
  );
}
