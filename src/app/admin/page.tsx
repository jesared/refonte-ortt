import { FileText, Image, Newspaper } from "lucide-react";

import { StatCard } from "@/components/admin/stat-card";
import { listMedia, listNews, listPages } from "@/lib/cms-store";

export default async function AdminPage() {
  const [pages, news, media] = await Promise.all([listPages(), listNews(), listMedia()]);

  const latestNews = news.slice(0, 3);
  const latestPages = pages.slice(0, 3);

  return (
    <section className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard title="Pages" value={String(pages.length)} icon={FileText} />
        <StatCard title="Actualités" value={String(news.length)} icon={Newspaper} />
        <StatCard title="Médias" value={String(media.length)} icon={Image} />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-lg border border-border bg-card p-5 text-card-foreground">
          <h2 className="text-base font-semibold">Dernières actualités</h2>
          <ul className="mt-4 space-y-2">
            {latestNews.map((item) => (
              <li key={item.id} className="rounded-md border border-border bg-background px-3 py-2 text-sm">
                {item.title}
              </li>
            ))}
            {latestNews.length === 0 ? (
              <li className="rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
                Aucune actualité.
              </li>
            ) : null}
          </ul>
        </article>

        <article className="rounded-lg border border-border bg-card p-5 text-card-foreground">
          <h2 className="text-base font-semibold">Pages récentes</h2>
          <ul className="mt-4 space-y-2">
            {latestPages.map((item) => (
              <li key={item.id} className="rounded-md border border-border bg-background px-3 py-2 text-sm">
                {item.title}
              </li>
            ))}
            {latestPages.length === 0 ? (
              <li className="rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
                Aucune page.
              </li>
            ) : null}
          </ul>
        </article>
      </div>
    </section>
  );
}
