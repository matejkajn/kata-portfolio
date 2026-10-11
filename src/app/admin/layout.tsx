import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { default: "Administrace", template: "%s — Administrace" },
  robots: { index: false, follow: false },
};

/** Shared wrapper for every /admin route (login included). */
export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <div className="flex min-h-screen flex-1 flex-col bg-[#f6f6fa]">{children}</div>;
}
