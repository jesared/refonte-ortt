"use client";

import type { ComponentType, SVGProps } from "react";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type SidebarLink = {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

type SidebarProps = {
  title: string;
  subtitle?: string;
  links: SidebarLink[];
  footer?: React.ReactNode;
  collapsed: boolean;
  onToggleCollapsed: () => void;
  onNavigate?: () => void;
};

export function Sidebar({
  title,
  subtitle,
  links,
  footer,
  collapsed,
  onToggleCollapsed,
  onNavigate,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "hidden h-screen shrink-0 border-r bg-muted/40 transition-[width] duration-300 lg:flex lg:flex-col",
        collapsed ? "w-20" : "w-64",
      )}
    >
      <div className="flex items-center justify-between border-b px-3 py-3">
        <div className={cn("min-w-0", collapsed && "sr-only")}> 
          <p className="truncate text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {subtitle}
          </p>
          <h2 className="truncate text-sm font-semibold">{title}</h2>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onToggleCollapsed}
          aria-label={collapsed ? "Agrandir la sidebar" : "Réduire la sidebar"}
          className="size-8 px-0"
        >
          {collapsed ? (
            <ChevronDown className="size-4 -rotate-90" />
          ) : (
            <ChevronDown className="size-4 rotate-90" />
          )}
        </Button>
      </div>

      <nav aria-label="Navigation dashboard" className="flex-1 px-2 py-3">
        <ul className="space-y-1">
          {links.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href;

            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={onNavigate}
                  className={cn(
                    "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    "hover:bg-muted hover:text-foreground",
                    isActive ? "bg-background text-foreground shadow-sm" : "text-muted-foreground",
                    collapsed && "justify-center px-2",
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  <span className={cn("truncate", collapsed && "hidden")}>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {footer ? <div className="border-t p-3">{footer}</div> : null}
    </aside>
  );
}
