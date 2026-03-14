"use client";

import { FileText, Image, LayoutDashboard, LogOut, Newspaper, Shield, Users, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

import { SidebarItem } from "@/components/admin/sidebar-item";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/pages", label: "Pages", icon: FileText },
  { href: "/admin/news", label: "Actualités", icon: Newspaper },
  { href: "/admin/media", label: "Médias", icon: Image },
  { href: "/admin/users", label: "Utilisateurs", icon: Users },
];

type SidebarProps = {
  mobileOpen: boolean;
  onCloseMobile: () => void;
};

function SidebarContent({ onCloseMobile }: { onCloseMobile?: () => void }) {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-b border-border px-5 py-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {isAdmin ? "Administration" : "Mon espace"}
        </p>
        <h2 className="mt-1 text-sm font-semibold text-foreground">Olympique Rémois Tennis de Table</h2>
      </div>
      <nav aria-label="Navigation principale" className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navigation.map((item) => (
            <SidebarItem key={item.href} {...item} onClick={onCloseMobile} />
          ))}
        </ul>
      </nav>
      <div className="shrink-0 border-t border-border px-3 py-3">
        <p className="mb-3 truncate px-3 text-xs font-medium text-muted-foreground">
          {session?.user?.email ?? "Utilisateur non connecté"}
        </p>
        <ul className="space-y-1">
          <SidebarItem href="/admin/profile" label="Profil" icon={Shield} onClick={onCloseMobile} />
          <li>
            <Button
              type="button"
              variant="outline"
              className="w-full justify-start gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={() => {
                onCloseMobile?.();
                signOut({ callbackUrl: "/" });
              }}
            >
              <LogOut className="size-4 shrink-0" />
              <span>Déconnexion</span>
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export function Sidebar({ mobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 border-r border-border bg-background lg:flex lg:flex-col">
        <SidebarContent />
      </aside>

      <div
        className={cn(
          "fixed inset-0 z-50 bg-background/80 transition-opacity lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onCloseMobile}
        aria-hidden="true"
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-border bg-background transition-transform duration-200 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
        aria-label="Navigation mobile"
      >
        <div className="flex items-center justify-end border-b border-border px-3 py-2">
          <Button variant="outline" size="sm" onClick={onCloseMobile} aria-label="Fermer le menu">
            <X className="size-4" />
          </Button>
        </div>
        <SidebarContent onCloseMobile={onCloseMobile} />
      </aside>
    </>
  );
}
