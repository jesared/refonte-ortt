"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MobileSidebar } from "@/components/mobile-sidebar";
import { Sidebar, type SidebarLink } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DashboardLayoutProps = {
  children: ReactNode;
  sidebarTitle: string;
  sidebarSubtitle?: string;
  links: SidebarLink[];
  headerTitle: string;
  footer?: ReactNode;
};

export function DashboardLayout({
  children,
  sidebarTitle,
  sidebarSubtitle,
  links,
  headerTitle,
  footer,
}: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar
        title={sidebarTitle}
        subtitle={sidebarSubtitle}
        links={links}
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((prev) => !prev)}
        footer={footer}
      />

      <MobileSidebar open={mobileOpen} onOpenChange={setMobileOpen}>
        <div className="flex h-full min-h-0 flex-col bg-background">
          <div className="border-b px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {sidebarSubtitle}
            </p>
            <h2 className="mt-1 text-sm font-semibold">{sidebarTitle}</h2>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            <nav aria-label="Navigation mobile" className="px-2 py-3">
              <ul className="space-y-1">
                {links.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          "hover:bg-muted hover:text-foreground",
                          isActive
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        <Icon className="size-4" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
          {footer ? <div className="border-t p-3">{footer}</div> : null}
        </div>
      </MobileSidebar>

      <main className="flex-1 overflow-y-auto scroll-smooth [scrollbar-gutter:stable]">
        <header className="sticky top-0 z-20 border-b bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:px-6 lg:hidden">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setMobileOpen(true)}
              aria-label="Ouvrir le menu"
              className="size-9"
            >
              <Menu className="size-4" />
            </Button>
            <h1 className="text-lg font-semibold">{headerTitle}</h1>
          </div>
        </header>

        <header className="hidden border-b bg-background/95 px-6 py-4 lg:block">
          <h1 className="text-xl font-semibold">{headerTitle}</h1>
        </header>

        <div className="p-4 sm:p-6">{children}</div>
      </main>
    </div>
  );
}
