import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { AccessDenied } from "@/components/admin/AccessDenied";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { PreviewBanner } from "@/components/admin/PreviewBanner";
import { getAdminSession } from "@/lib/admin/auth";
import { listProjects } from "@/lib/admin/queries";

/**
 * Authenticated admin shell: sidebar + content. The proxy already turned away
 * signed-out visitors; this enforces the admin allowlist.
 */
export default async function AdminPanelLayout({ children }: { children: ReactNode }) {
  const session = await getAdminSession();

  if (session.status === "anonymous") redirect("/admin/login");
  if (session.status === "forbidden") return <AccessDenied email={session.email} />;

  const projects = await listProjects();

  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <AdminSidebar projects={projects} email={session.email} />
      <main className="min-w-0 flex-1 px-5 py-8 sm:px-10 md:py-12">
        <div className="mx-auto w-full max-w-4xl">
          {session.preview && <PreviewBanner />}
          {children}
        </div>
      </main>
    </div>
  );
}
