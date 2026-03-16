"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";

import { usePathname } from "next/navigation";

import { AdminHeader } from "@/components/admin/admin-header";
import { Sidebar } from "@/components/admin/sidebar";
import type { AdminSidebarSession } from "@/components/admin/admin-session";

const TITLES: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/pages": "Pages",
  "/admin/news": "Actualités",
  "/admin/media": "Médias",
  "/admin/users": "Utilisateurs",
  "/admin/profile": "Profil",
};

type AdminShellProps = {
  children: ReactNode;
  session: AdminSidebarSession;
};

export function AdminShell({ children, session }: AdminShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const title = useMemo(() => {
    if (!pathname) return "Administration";

    if (pathname.startsWith("/admin/pages/")) return "Édition d'une page";
    if (pathname.startsWith("/admin/news/")) return "Édition d'une actualité";

    return TITLES[pathname] ?? "Administration";
  }, [pathname]);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar
        session={session}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="min-w-0 flex-1">
        <AdminHeader title={title} onMenuClick={() => setMobileOpen(true)} />
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
