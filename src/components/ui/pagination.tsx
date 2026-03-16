import Link from "next/link";
import type * as React from "react";

import { cn } from "@/lib/utils";

export function Pagination({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <nav aria-label="Pagination" className={cn("flex w-full justify-end", className)} {...props} />;
}

export function PaginationContent({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("flex items-center gap-2", className)} {...props} />;
}

export function PaginationItem({ ...props }: React.HTMLAttributes<HTMLLIElement>) {
  return <li {...props} />;
}

export function PaginationLink({ className, isActive, ...props }: React.ComponentProps<typeof Link> & { isActive?: boolean }) {
  return (
    <Link
      className={cn(
        "inline-flex h-9 min-w-9 items-center justify-center rounded-md border px-3 text-sm",
        isActive ? "border-primary bg-primary text-primary-foreground" : "border-input hover:bg-muted",
        className,
      )}
      {...props}
    />
  );
}
