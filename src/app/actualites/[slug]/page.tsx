import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { formatNewsDate, getNewsBySlug, mockNews } from "@/lib/mock-news";

interface NewsArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return mockNews.map((article) => ({
    slug: article.slug,
  }));
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm sm:p-8">
      <Link href="/actualites" className="text-sm font-medium text-primary transition-colors hover:opacity-80">
        ← Retour aux actualités
      </Link>

      <header className="mt-4">
        <p className="text-sm text-muted-foreground">
          {formatNewsDate(article.date)} · {article.author}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {article.title}
        </h1>
      </header>

      <div className="relative mt-6 h-64 w-full overflow-hidden rounded-lg sm:h-96">
        <Image src={article.image} alt={article.title} fill className="object-cover" priority />
      </div>

      <div className="mt-6 space-y-4 text-muted-foreground">
        {article.content.map((paragraph, index) => (
          <p key={`${article.slug}-paragraph-${index + 1}`}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
