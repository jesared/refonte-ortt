"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";

import { usePathname } from "next/navigation";

import { AdminHeader } from "@/components/admin/admin-header";
import type { AdminSidebarSession } from "@/components/admin/admin-session";
import { Sidebar } from "@/components/admin/sidebar";

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
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <main className="min-w-0 flex-1 overflow-y-auto scroll-smooth [scrollbar-gutter:stable]">
        <div className="flex min-h-full min-w-0 flex-col">
          <AdminHeader title={title} onMenuClick={() => setMobileOpen(true)} />
          <div className="min-h-0 flex-1 p-4 sm:p-6">{children}</div>
        </div>
      </main>

      <Sidebar
        session={session}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
    </div>
  );
}
