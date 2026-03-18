"use client";

import type { ReactNode } from "react";
import { useMemo } from "react";

import {
  Bell,
  FileText,
  LayoutDashboard,
  LogOut,
  Receipt,
  Shield,
  Users,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { DashboardLayout } from "@/components/dashboard-layout";
import type { SidebarLink } from "@/components/sidebar";
import { Button } from "@/components/ui/button";

const TITLES: Record<string, string> = {
  "/user": "Dashboard",
  "/user/profile": "Mon profil",
  "/user/documents": "Documents",
  "/user/tarifs": "Tarifs",
};

const USER_LINKS: SidebarLink[] = [
  { href: "/user", label: "Dashboard", icon: LayoutDashboard },
  { href: "/user/profile", label: "Mon profil", icon: Users },
  { href: "/user/inscriptions", label: "Mes inscriptions", icon: FileText },
  { href: "/user/documents", label: "Documents", icon: FileText },
  { href: "/user/tarifs", label: "Tarifs", icon: Receipt },
  { href: "/user/notifications", label: "Notifications", icon: Bell },
];

export function UserShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const title = useMemo(
    () => TITLES[pathname] ?? "Espace utilisateur",
    [pathname],
  );

  const footer = (
    <div className="space-y-3">
      <p className="truncate px-1 text-xs font-medium text-muted-foreground">
        {session?.user?.email ?? "Utilisateur non connecté"}
      </p>
      {session?.user?.role?.toLowerCase() === "admin" ? (
        <Button asChild type="button" variant="outline" className="w-full justify-start gap-3">
          <Link href="/admin">
            <Shield className="size-4" />
            <span>Administration</span>
          </Link>
        </Button>
      ) : null}
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
      sidebarSubtitle="Mon espace"
      links={USER_LINKS}
      headerTitle={title}
      footer={footer}
    >
      {children}
    </DashboardLayout>
  );
}
