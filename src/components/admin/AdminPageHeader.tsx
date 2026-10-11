import type { ReactNode } from "react";

interface AdminPageHeaderProps {
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
}

/** Title row at the top of every admin screen. */
export function AdminPageHeader({ title, description, actions }: AdminPageHeaderProps) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink">{title}</h1>
        {description && <p className="mt-1 max-w-2xl text-sm text-muted">{description}</p>}
      </div>
      {actions}
    </header>
  );
}
