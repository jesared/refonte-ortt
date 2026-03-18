"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

type SheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
};

type SheetContentProps = {
  children: React.ReactNode;
  className?: string;
  side?: "left" | "right";
};

const SheetContext = React.createContext<
  { onOpenChange: (open: boolean) => void } | undefined
>(undefined);

export function Sheet({ open, onOpenChange, children }: SheetProps) {
  React.useEffect(() => {
    if (!open) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [open, onOpenChange]);

  if (!open) {
    return null;
  }

  return (
    <SheetContext.Provider value={{ onOpenChange }}>
      <div className="fixed inset-0 z-50 lg:hidden">
        <button
          type="button"
          aria-label="Fermer le menu"
          onClick={() => onOpenChange(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"
        />
        {children}
      </div>
    </SheetContext.Provider>
  );
}

export function SheetContent({
  children,
  className,
  side = "right",
}: SheetContentProps) {
  const context = React.useContext(SheetContext);

  if (!context) {
    throw new Error("SheetContent must be used within a Sheet component.");
  }

  return (
    <div
      className={cn(
        "absolute inset-y-0 z-50 flex w-3/4 max-w-64 flex-col border-r border-border bg-background shadow-xl transition duration-300 animate-in slide-in-from-left",
        side === "right" && "right-0 border-l border-r-0 slide-in-from-right",
        side === "left" && "left-0",
        className,
      )}
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-end border-b border-border px-2 py-2">
        <button
          type="button"
          onClick={() => context.onOpenChange(false)}
          className="inline-flex size-8 items-center justify-center rounded-md border border-input bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Fermer"
        >
          <X className="size-4" />
        </button>
      </div>
      {children}
    </div>
  );
}
