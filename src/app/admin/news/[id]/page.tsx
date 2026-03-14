import Link from "next/link";
import { notFound } from "next/navigation";

import { updateNewsAction } from "@/app/admin/actions";
import { FormSubmitButton } from "@/components/admin/form-submit-button";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { getNews } from "@/lib/cms-store";

export default async function AdminNewsEdition({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const news = await getNews(id);

  if (!news) {
    notFound();
  }

  return (
    <section className="space-y-6">
      <Link href="/admin/news" className="text-sm text-muted-foreground hover:text-foreground">
        ← Retour à la liste
      </Link>

      <article className="rounded-lg border border-border bg-card p-5">
        <h2 className="text-lg font-semibold text-foreground">Modifier une actualité</h2>

        <form action={updateNewsAction} className="mt-4 space-y-4">
          <input type="hidden" name="id" value={news.id} />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Titre</label>
              <input
                name="title"
                defaultValue={news.title}
                required
                className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Slug</label>
              <input
                name="slug"
                defaultValue={news.slug}
                required
                className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Extrait</label>
            <textarea
              name="excerpt"
              defaultValue={news.excerpt}
              rows={3}
              required
              className="w-full rounded-md border border-border bg-background p-3 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Image mise en avant (URL)</label>
            <input name="image" defaultValue={news.image} className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm" />
          </div>

          <RichTextEditor name="content" label="Contenu" defaultValue={news.content} />

          <label className="inline-flex items-center gap-2 text-sm text-foreground">
            <input type="checkbox" name="published" defaultChecked={news.published} className="size-4 rounded border-border" />
            Article publié
          </label>

          <FormSubmitButton>Sauvegarder</FormSubmitButton>
        </form>
      </article>
    </section>
  );
}
