"use client";

import type { ComponentType, SVGProps } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type SidebarItemProps = {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  collapsed?: boolean;
};

export function SidebarItem({
  href,
  label,
  icon: Icon,
  collapsed = false,
}: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={cn(
          "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground",
          collapsed && "justify-center px-2",
        )}
      >
        <Icon className="size-4 shrink-0" />
        {!collapsed ? <span>{label}</span> : null}
      </Link>
    </li>
  );
}
