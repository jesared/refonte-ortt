"use client";

import { useState } from "react";

import {
  FileText,
  GalleryVerticalEnd,
  Handshake,
  LayoutDashboard,
  Menu,
  Newspaper,
  Settings,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { SidebarItem } from "./sidebar-item";

const navigation = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/pages", label: "Pages", icon: FileText },
  { href: "/admin/actualites", label: "Actualités", icon: Newspaper },
  { href: "/admin/galerie", label: "Galerie", icon: GalleryVerticalEnd },
  { href: "/admin/equipes", label: "Equipes", icon: Users },
  { href: "/admin/partenaires", label: "Partenaires", icon: Handshake },
  { href: "/admin/parametres", label: "Paramètres", icon: Settings },
];

const EXPANDED_WIDTH = "260px";
const COLLAPSED_WIDTH = "80px";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "sticky top-0 h-screen border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200",
      )}
      style={{ width: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH }}
    >
      <div className="flex h-full flex-col p-3">
        <div className={cn("mb-4 flex items-center", collapsed ? "justify-center" : "justify-between")}>
          {!collapsed ? <span className="text-sm font-semibold">Admin</span> : null}
          <button
            type="button"
            onClick={() => setCollapsed((current) => !current)}
            className="inline-flex size-8 items-center justify-center rounded-md border border-sidebar-border text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
            aria-label={collapsed ? "Ouvrir la barre latérale" : "Réduire la barre latérale"}
          >
            <Menu className="size-4" />
          </button>
        </div>

        <nav aria-label="Navigation principale" className="flex-1">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <SidebarItem key={item.href} {...item} collapsed={collapsed} />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
