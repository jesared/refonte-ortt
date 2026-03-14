"use client";

import type { ComponentType, SVGProps } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type SidebarItemProps = {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  onClick?: () => void;
};

export function SidebarItem({ href, label, icon: Icon, onClick }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          "hover:bg-muted hover:text-foreground",
          isActive ? "bg-card text-foreground" : "text-muted-foreground",
        )}
      >
        <Icon className="size-4 shrink-0" />
        <span>{label}</span>
      </Link>
    </li>
  );
}
