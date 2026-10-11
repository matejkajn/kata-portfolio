import Image from "next/image";
import Link from "next/link";

import { SidebarGroup } from "./SidebarGroup";
import { SidebarLink } from "./SidebarLink";
import { SignOutButton } from "./SignOutButton";
import type { ProjectSummary } from "@/lib/admin/queries";

interface AdminSidebarProps {
  projects: ProjectSummary[];
  email: string;
}

const SITE_LINKS = [
  { href: "/admin/settings", label: "Nastavení webu" },
  { href: "/admin/process", label: "Kreativní proces" },
  { href: "/admin/references", label: "Reference" },
];

/** Left-hand navigation: site-wide content, then every project. */
export function AdminSidebar({ projects, email }: AdminSidebarProps) {
  return (
    <aside className="bg-brand-gradient flex w-full shrink-0 flex-col gap-8 px-4 py-6 text-white md:sticky md:top-0 md:h-screen md:w-72 md:overflow-y-auto">
      <div className="flex items-center justify-between px-3">
        <Link href="/admin" className="flex items-center gap-3">
          <Image
            src="/homepage/logo.png"
            alt=""
            width={120}
            height={76}
            className="h-7 w-auto brightness-0 invert"
          />
          <span className="text-sm font-semibold">Administrace</span>
        </Link>
        <Link
          href="/"
          target="_blank"
          className="text-xs text-white/60 hover:text-white"
          title="Otevřít web v nové kartě"
        >
          Web ↗
        </Link>
      </div>

      <SidebarGroup title="Web">
        {SITE_LINKS.map((link) => (
          <SidebarLink key={link.href} href={link.href}>
            {link.label}
          </SidebarLink>
        ))}
      </SidebarGroup>

      <SidebarGroup
        title={`Projekty (${projects.length})`}
        action={
          <Link
            href="/admin/projects/new"
            className="rounded-md bg-accent px-2 py-0.5 text-xs font-semibold text-ink hover:brightness-95"
          >
            + Nový
          </Link>
        }
      >
        {projects.map((project) => (
          <SidebarLink key={project.id} href={`/admin/projects/${project.id}`}>
            {project.title}
          </SidebarLink>
        ))}
        {projects.length === 0 && (
          <p className="px-3 text-sm text-white/50">Zatím žádné projekty.</p>
        )}
      </SidebarGroup>

      <div className="mt-auto flex flex-col gap-1 border-t border-white/15 px-3 pt-4">
        <span className="truncate text-xs text-white/80" title={email}>
          {email}
        </span>
        <SignOutButton />
      </div>
    </aside>
  );
}
