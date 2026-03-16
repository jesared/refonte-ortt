"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const DropdownMenuContext = React.createContext<{ open: boolean; setOpen: (open: boolean) => void } | null>(null);

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return <DropdownMenuContext.Provider value={{ open, setOpen }}>{children}</DropdownMenuContext.Provider>;
}

export function DropdownMenuTrigger({ className, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(DropdownMenuContext);
  if (!context) return null;

  return (
    <button
      type="button"
      className={cn(className)}
      onClick={(event) => {
        context.setOpen(!context.open);
        onClick?.(event);
      }}
      {...props}
    />
  );
}

export function DropdownMenuContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(DropdownMenuContext);
  if (!context?.open) return null;

  return (
    <div
      className={cn(
        "absolute right-0 z-50 mt-2 min-w-44 rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        className,
      )}
      {...props}
    />
  );
}

export function DropdownMenuItem({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-muted",
        className,
      )}
      {...props}
    />
  );
}
