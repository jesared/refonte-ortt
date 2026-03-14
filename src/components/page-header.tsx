import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description: string;
  className?: string;
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <header className={cn("mb-8 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm", className)}>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-3xl text-base text-muted-foreground sm:text-lg">{description}</p>
    </header>
  );
}
