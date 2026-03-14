import Image from "next/image";
import Link from "next/link";

import type { NewsArticle } from "@/lib/mock-news";

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  const formattedDate = new Date(article.date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-48 w-full">
        <Image src={article.image} alt={article.title} fill className="object-cover" />
      </div>

      <div className="p-5">
        <p className="text-sm text-slate-500">{formattedDate}</p>
        <h2 className="mt-2 text-xl font-semibold text-slate-900">{article.title}</h2>
        <p className="mt-3 text-sm text-slate-600">{article.excerpt}</p>

        <Link
          href={`/actualites/${article.slug}`}
          className="mt-4 inline-flex text-sm font-medium text-sky-700 hover:text-sky-900"
        >
          Lire l&apos;article →
        </Link>
      </div>
    </article>
  );
}
