import { NewsCard } from "@/components/news-card";
import { PageHeader } from "@/components/page-header";
import { mockNews } from "@/lib/mock-news";

export default function ActualitesPage() {
  return (
    <section>
      <PageHeader
        title="Actualités"
        description="Retrouvez les dernières nouvelles du club, les annonces et les événements à venir."
      />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {mockNews.map((article) => (
          <NewsCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
