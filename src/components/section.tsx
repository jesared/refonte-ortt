import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  tone?: "default" | "muted";
}

export function Section({
  eyebrow,
  title,
  description,
  children,
  className,
  tone = "default",
}: SectionProps) {
  const isMuted = tone === "muted";

  return (
    <section
      className={cn(
        "rounded-2xl border border-border p-6 shadow-sm sm:p-8",
        isMuted ? "bg-muted" : "bg-card text-card-foreground",
        className,
      )}
    >
      <header className="mb-6">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{title}</h2>
        {description ? <p className="mt-2 max-w-3xl text-muted-foreground">{description}</p> : null}
      </header>
      {children}
    </section>
  );
}
