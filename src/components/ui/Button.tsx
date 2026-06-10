import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "accent" | "outline";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  accent: "bg-accent text-ink hover:brightness-95",
  outline:
    "border border-white/40 text-white hover:bg-white hover:text-brand-dark",
};

const BASE =
  "inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

interface ButtonAsLinkProps {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

/** A pill link styled per the design system. */
export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
}: ButtonAsLinkProps) {
  return (
    <Link href={href} className={cn(BASE, VARIANT_CLASSES[variant], className)}>
      {children}
    </Link>
  );
}

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: Variant;
}

/** A pill button (for forms / actions) styled per the design system. */
export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(BASE, VARIANT_CLASSES[variant], className)} {...props}>
      {children}
    </button>
  );
}
