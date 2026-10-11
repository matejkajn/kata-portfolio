import Image from "next/image";
import type { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  children: ReactNode;
}

/** Centered card on the brand gradient, used by the login / access screens. */
export function AuthCard({ title, children }: AuthCardProps) {
  return (
    <main className="bg-brand-gradient flex min-h-screen flex-1 items-center justify-center px-6 py-16">
      <div className="flex w-full max-w-sm flex-col items-center gap-6 rounded-3xl bg-white p-8 text-center shadow-2xl shadow-brand-dark/40">
        <Image src="/homepage/logo.png" alt="" width={120} height={76} className="h-12 w-auto" />
        <h1 className="text-xl font-bold tracking-tight text-ink">{title}</h1>
        {children}
      </div>
    </main>
  );
}
