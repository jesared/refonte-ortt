import Link from "next/link";

import { Section } from "@/components/section";
import { NewsCard } from "@/components/news-card";
import { mockNews } from "@/lib/mock-news";

export function LatestNewsSection() {
  const latestNews = mockNews.slice(0, 3);

  return (
    <Section
      eyebrow="Actualités"
      title="Les dernières nouvelles du club"
      description="Restez informé des compétitions, de la vie associative et des nouveautés de la saison."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {latestNews.map((article) => (
          <NewsCard key={article.slug} article={article} />
        ))}
      </div>
      <div className="mt-5">
        <Link href="/actualites" className="text-sm font-semibold text-blue-700 hover:text-blue-900">
          Voir toutes les actualités →
        </Link>
      </div>
    </Section>
  );
}
