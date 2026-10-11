"use client";

import { AdminButton } from "@/components/admin/AdminButton";
import { AdminCard } from "@/components/admin/AdminCard";

interface AdminErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/** Keeps the sidebar usable when one admin screen fails to load. */
export default function AdminError({ error, reset }: AdminErrorProps) {
  return (
    <AdminCard title="Tuto stránku se nepodařilo načíst">
      <p className="mb-4 text-sm text-muted">{error.message}</p>
      <AdminButton onClick={reset}>Zkusit znovu</AdminButton>
    </AdminCard>
  );
}
