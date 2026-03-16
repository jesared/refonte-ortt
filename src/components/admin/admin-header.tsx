"use client";

import { Bell, Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

type AdminHeaderProps = {
  title: string;
  onMenuClick: () => void;
};

export function AdminHeader({ title, onMenuClick }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:px-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden"
            aria-label="Ouvrir le menu"
          >
            <Menu className="size-4" />
          </Button>
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative w-full min-w-0 md:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Rechercher..."
              className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            aria-label="Notifications"
            className="shrink-0"
          >
            <Bell className="size-4" />
          </Button>

          <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-sm font-semibold text-card-foreground">
            OR
          </div>
        </div>
      </div>
    </header>
  );
}
