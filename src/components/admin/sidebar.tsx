"use client";

import { FileText, Image, LayoutDashboard, Newspaper, X } from "lucide-react";

import { ProfileCard } from "@/components/admin/profile-card";
import { SidebarItem } from "@/components/admin/sidebar-item";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/pages", label: "Pages", icon: FileText },
  { href: "/admin/news", label: "Actualités", icon: Newspaper },
  { href: "/admin/media", label: "Médias", icon: Image },
];

type SidebarProps = {
  mobileOpen: boolean;
  onCloseMobile: () => void;
};

function SidebarContent({ onCloseMobile }: { onCloseMobile?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border px-5 py-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Administration</p>
        <h2 className="mt-1 text-sm font-semibold text-foreground">Olympique Rémois Tennis de Table</h2>
      </div>
      <nav aria-label="Navigation principale" className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navigation.map((item) => (
            <SidebarItem key={item.href} {...item} onClick={onCloseMobile} />
          ))}
        </ul>
      </nav>
      <div className="mt-auto px-3 pb-3">
        <ProfileCard />
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
