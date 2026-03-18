"use client";

import type { ReactNode } from "react";
import { useMemo } from "react";

import { FileText, Image, LayoutDashboard, LogOut, Newspaper, Shield, Users } from "lucide-react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

import type { AdminSidebarSession } from "@/components/admin/admin-session";
import { DashboardLayout } from "@/components/dashboard-layout";
import type { SidebarLink } from "@/components/sidebar";
import { Button } from "@/components/ui/button";

const TITLES: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/pages": "Pages",
  "/admin/news": "Actualités",
  "/admin/media": "Médias",
  "/admin/users": "Utilisateurs",
  "/admin/profile": "Profil",
};

const ADMIN_LINKS: SidebarLink[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/pages", label: "Pages", icon: FileText },
  { href: "/admin/news", label: "Actualités", icon: Newspaper },
  { href: "/admin/media", label: "Médias", icon: Image },
  { href: "/admin/users", label: "Utilisateurs", icon: Users },
  { href: "/admin/profile", label: "Profil", icon: Shield },
];

type AdminShellProps = {
  children: ReactNode;
  session: AdminSidebarSession;
};

export function AdminShell({ children, session }: AdminShellProps) {
  const pathname = usePathname();

  const title = useMemo(() => {
    if (!pathname) return "Administration";

    if (pathname.startsWith("/admin/pages/")) return "Édition d'une page";
    if (pathname.startsWith("/admin/news/")) return "Édition d'une actualité";

    return TITLES[pathname] ?? "Administration";
  }, [pathname]);

  const footer = (
    <div className="space-y-3">
      <p className="truncate px-1 text-xs font-medium text-muted-foreground">
        {session?.user?.email ?? "Utilisateur non connecté"}
      </p>
      <Button
        type="button"
        variant="outline"
        className="w-full justify-start gap-3"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        <LogOut className="size-4" />
        <span>Déconnexion</span>
      </Button>
    </div>
  );

  return (
    <DashboardLayout
      sidebarTitle="Olympique Rémois Tennis de Table"
      sidebarSubtitle="Administration"
      links={ADMIN_LINKS}
      headerTitle={title}
      footer={footer}
    >
      {children}
    </DashboardLayout>
  );
}
