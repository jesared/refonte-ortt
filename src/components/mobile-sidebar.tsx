"use client";

import type { ReactNode } from "react";

import { Sheet, SheetContent } from "@/components/ui/sheet";

type MobileSidebarProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
};

export function MobileSidebar({
  open,
  onOpenChange,
  children,
}: MobileSidebarProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-64 p-0">
        {children}
      </SheetContent>
    </Sheet>
  );
}
