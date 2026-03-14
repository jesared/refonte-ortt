import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}

export function Section({
  eyebrow,
  title,
  description,
  children,
  className,
  tone = "light",
}: SectionProps) {
  const isDark = tone === "dark";

  return (
    <section
      className={cn(
        "rounded-2xl border p-6 shadow-sm sm:p-8",
        isDark ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white",
        className,
      )}
    >
      <header className="mb-6">
        {eyebrow ? (
          <p className={cn("text-xs font-semibold uppercase tracking-[0.16em]", isDark ? "text-blue-300" : "text-blue-700")}>
            {eyebrow}
          </p>
        ) : null}
        <h2 className={cn("mt-2 text-2xl font-bold sm:text-3xl", isDark ? "text-white" : "text-slate-900")}>{title}</h2>
        {description ? (
          <p className={cn("mt-2 max-w-3xl", isDark ? "text-slate-200" : "text-slate-600")}>{description}</p>
        ) : null}
      </header>
      {children}
    </section>
  );
}
