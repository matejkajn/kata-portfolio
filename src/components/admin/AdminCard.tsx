import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface AdminCardProps {
  title?: string;
  description?: string;
  /** Buttons shown on the right of the card header. */
  actions?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** White panel grouping related admin controls. */
export function AdminCard({ title, description, actions, className, children }: AdminCardProps) {
  return (
    <section className={cn("rounded-2xl border border-line bg-white p-5 sm:p-6", className)}>
      {(title || actions) && (
        <header className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            {title && <h2 className="text-base font-semibold text-ink">{title}</h2>}
            {description && <p className="mt-1 text-sm text-muted">{description}</p>}
          </div>
          {actions}
        </header>
      )}
      {children}
    </section>
  );
}
