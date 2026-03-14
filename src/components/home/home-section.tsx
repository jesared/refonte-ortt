import type { ReactNode } from "react";

interface HomeSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}

export function HomeSection({
  eyebrow,
  title,
  description,
  children,
  className = "",
  tone = "light",
}: HomeSectionProps) {
  const dark = tone === "dark";

  return (
    <section className={`rounded-2xl border p-6 shadow-sm sm:p-8 ${dark ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"} ${className}`}>
      <header className="mb-6">
        {eyebrow ? (
          <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${dark ? "text-blue-300" : "text-blue-700"}`}>
            {eyebrow}
          </p>
        ) : null}
        <h2 className={`mt-2 text-2xl font-bold sm:text-3xl ${dark ? "text-white" : "text-slate-900"}`}>{title}</h2>
        {description ? <p className={`mt-2 max-w-3xl ${dark ? "text-slate-200" : "text-slate-600"}`}>{description}</p> : null}
      </header>
      {children}
    </section>
  );
}
