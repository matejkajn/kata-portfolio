import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AuthCard } from "@/components/admin/AuthCard";
import { GoogleSignInButton } from "@/components/admin/GoogleSignInButton";
import { getAdminSession } from "@/lib/admin/auth";

export const metadata: Metadata = { title: "Přihlášení" };

interface LoginPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await getAdminSession();
  if (session.status !== "anonymous") redirect("/admin");

  const { error } = await searchParams;

  return (
    <AuthCard title="Administrace portfolia">
      <p className="text-sm text-muted">
        Přihlaste se Google účtem, který má přístup ke správě webu.
      </p>
      {error && (
        <p role="alert" className="text-sm text-red-700">
          Přihlášení se nezdařilo, zkuste to prosím znovu.
        </p>
      )}
      <GoogleSignInButton />
    </AuthCard>
  );
}
