import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** `primary` — navy on white backgrounds; `glass` — frosted on dark ones. */
type Variant = "primary" | "glass";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-navy font-medium text-cream hover:bg-navy/90",
  glass: "bg-white/25 font-medium text-white backdrop-blur-sm hover:bg-white/35",
};

/** `md` — default; `lg` — prominent section CTAs. */
type Size = "md" | "lg";

const SIZE_CLASSES: Record<Size, string> = {
  md: "px-10 py-2.5 text-lg",
  lg: "px-14 py-3 text-xl",
};

const BASE =
  "inline-flex items-center justify-center rounded-xl transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

interface ButtonAsLinkProps {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

/** A pill link styled per the design system. */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: ButtonAsLinkProps) {
  return (
    <Link href={href} className={cn(BASE, SIZE_CLASSES[size], VARIANT_CLASSES[variant], className)}>
      {children}
    </Link>
  );
}

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: Variant;
  size?: Size;
}

/** A pill button (for forms / actions) styled per the design system. */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(BASE, SIZE_CLASSES[size], VARIANT_CLASSES[variant], className)} {...props}>
      {children}
    </button>
  );
}
