import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description: string;
  className?: string;
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <header className={cn("mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm", className)}>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-3xl text-base text-slate-600 sm:text-lg">{description}</p>
    </header>
  );
}
