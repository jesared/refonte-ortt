import Image from "next/image";
import Link from "next/link";

import { formatNewsDate, type NewsArticle } from "@/lib/mock-news";

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <Link href={`/actualites/${article.slug}`} className="block">
        <div className="relative h-48 w-full">
          <Image src={article.image} alt={article.title} fill className="object-cover" />
        </div>
      </Link>

      <div className="p-5">
        <p className="text-sm text-slate-500">{formatNewsDate(article.date)}</p>
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
