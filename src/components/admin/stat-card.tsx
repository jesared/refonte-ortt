import type { ComponentType, SVGProps } from "react";

type StatCardProps = {
  title: string;
  value: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export function StatCard({ title, value, icon: Icon }: StatCardProps) {
  return (
    <article className="rounded-lg border border-border bg-card p-5 text-card-foreground">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
        </div>
        <span className="flex size-9 items-center justify-center rounded-md border border-border bg-background">
          <Icon className="size-4 text-muted-foreground" />
        </span>
      </div>
    </article>
  );
}
