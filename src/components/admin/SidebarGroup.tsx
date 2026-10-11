import type { ReactNode } from "react";

interface SidebarGroupProps {
  title: string;
  /** Optional control next to the title (e.g. "+ Nový"). */
  action?: ReactNode;
  children: ReactNode;
}

/** Titled block of sidebar links. */
export function SidebarGroup({ title, action, children }: SidebarGroupProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between px-3 pb-1">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-white/45">{title}</h2>
        {action}
      </div>
      <nav className="flex flex-col gap-0.5">{children}</nav>
    </div>
  );
}
