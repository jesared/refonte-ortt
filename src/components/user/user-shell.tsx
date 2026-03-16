"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";

import { usePathname } from "next/navigation";

import { AdminHeader } from "@/components/admin/admin-header";
import { UserSidebar } from "@/components/user/sidebar";

const TITLES: Record<string, string> = {
  "/user": "Dashboard",
  "/user/profile": "Mon profil",
  "/user/documents": "Documents",
  "/user/tarifs": "Tarifs",
};

export function UserShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const title = useMemo(() => TITLES[pathname] ?? "Espace utilisateur", [pathname]);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <UserSidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />

      <div className="min-w-0 flex-1">
        <AdminHeader title={title} onMenuClick={() => setMobileOpen(true)} />
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
