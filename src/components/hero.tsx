import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface HeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export function Hero({ eyebrow, title, description, actions, className }: HeroProps) {
  return (
    <section
      className={cn(
        "rounded-2xl bg-gradient-to-r from-blue-800 via-blue-700 to-sky-600 p-8 text-white shadow-lg sm:p-12",
        className,
      )}
    >
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-100">{eyebrow}</p> : null}
      <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">{title}</h1>
      {description ? <p className="mt-4 max-w-2xl text-blue-100 sm:text-lg">{description}</p> : null}
      {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
    </section>
  );
}
