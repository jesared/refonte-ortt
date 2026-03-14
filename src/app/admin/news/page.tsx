import Link from "next/link";

import { createNewsAction, deleteNewsAction } from "@/app/admin/actions";
import { FormSubmitButton } from "@/components/admin/form-submit-button";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { listNews } from "@/lib/cms-store";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium" }).format(new Date(date));
}

export default async function AdminNews() {
  const items = await listNews();

  return (
    <section className="space-y-6">
      <article className="rounded-lg border border-border bg-card p-5">
        <h2 className="text-lg font-semibold text-foreground">Créer une actualité</h2>

        <form action={createNewsAction} className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Titre</label>
              <input name="title" required className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Slug</label>
              <input name="slug" required className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Extrait</label>
            <textarea name="excerpt" required rows={3} className="w-full rounded-md border border-border bg-background p-3 text-sm" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Image mise en avant (URL)</label>
            <input name="image" className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm" />
          </div>

          <RichTextEditor name="content" label="Contenu" />

          <label className="inline-flex items-center gap-2 text-sm text-foreground">
            <input type="checkbox" name="published" className="size-4 rounded border-border" />
            Publier immédiatement
          </label>

          <FormSubmitButton>Créer l’article</FormSubmitButton>
        </form>
      </article>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="rounded-lg border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">{formatDate(item.createdAt)}</p>
            <h3 className="mt-1 text-base font-semibold text-foreground">{item.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{item.excerpt}</p>

            <div className="mt-3 inline-flex rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground">
              {item.published ? "Publié" : "Brouillon"}
            </div>

            <div className="mt-4 flex gap-2">
              <Link
                href={`/admin/news/${item.id}`}
                className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Éditer
              </Link>

              <form action={deleteNewsAction}>
                <input type="hidden" name="id" value={item.id} />
                <FormSubmitButton variant="outline" size="sm" pendingLabel="Suppression...">
                  Supprimer
                </FormSubmitButton>
              </form>
            </div>
          </article>
        ))}
        {items.length === 0 ? (
          <p className="rounded-lg border border-border bg-card p-8 text-center text-sm text-muted-foreground md:col-span-2 xl:col-span-3">
            Aucune actualité pour le moment.
          </p>
        ) : null}
      </div>
    </section>
  );
}
