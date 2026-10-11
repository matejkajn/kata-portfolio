"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface SidebarLinkProps {
  href: string;
  children: ReactNode;
}

/** Sidebar navigation entry, highlighted when its route is open. */
export function SidebarLink({ href, children }: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "block truncate rounded-lg px-3 py-2 text-sm transition-colors",
        isActive
          ? "bg-white/15 font-semibold text-white"
          : "text-white/70 hover:bg-white/10 hover:text-white",
      )}
    >
      {children}
    </Link>
  );
}
