"use client";

import Link from "next/link";
import { useSmoothAnchorScroll } from "@/hooks/useSmoothAnchorScroll";
import { cn } from "@/lib/cn";
import { DoubleChevronDownIcon } from "./DoubleChevronDownIcon";

interface ScrollDownLinkProps {
  /** Anchor of the section to scroll to. */
  href: string;
  /** Accessible name, since the link shows only an icon. */
  label: string;
  className?: string;
}

/**
 * Gently bobbing double-chevron link hinting that there is more content below;
 * glides slowly to the target section on click.
 */
export function ScrollDownLink({ href, label, className }: ScrollDownLinkProps) {
  const handleClick = useSmoothAnchorScroll();

  return (
    <Link
      href={href}
      aria-label={label}
      onClick={handleClick}
      className={cn(
        "inline-flex rounded-full p-2 text-white/80 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className,
      )}
    >
      <DoubleChevronDownIcon className="size-14 motion-safe:animate-bob-down md:size-20" />
    </Link>
  );
}
