import Link from "next/link";

import { createPageAction, deletePageAction } from "@/app/admin/actions";
import { FormSubmitButton } from "@/components/admin/form-submit-button";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { listPages } from "@/lib/cms-store";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(date));
}

export default async function AdminPages() {
  const pages = await listPages();

  return (
    <section className="space-y-6">
      <article className="rounded-lg border border-border bg-card p-5">
        <h2 className="text-lg font-semibold text-foreground">Créer une page</h2>

        <form action={createPageAction} className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="title">
                Titre
              </label>
              <input
                id="title"
                name="title"
                required
                className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="slug">
                Slug
              </label>
              <input
                id="slug"
                name="slug"
                required
                className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground"
              />
            </div>
          </div>

          <RichTextEditor name="content" label="Contenu" />

          <FormSubmitButton>Créer la page</FormSubmitButton>
        </form>
      </article>

      <article className="overflow-hidden rounded-lg border border-border bg-card">
        <table className="w-full text-left text-sm text-foreground">
          <thead className="bg-background">
            <tr>
              <th className="px-4 py-3 font-medium">Titre</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Dernière mise à jour</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.id} className="border-t border-border">
                <td className="px-4 py-3">{page.title}</td>
                <td className="px-4 py-3 text-muted-foreground">/{page.slug}</td>
                <td className="px-4 py-3 text-muted-foreground">{formatDate(page.updatedAt)}</td>
                <td className="space-x-2 px-4 py-3 text-right">
                  <Link
                    href={`/admin/pages/${page.id}`}
                    className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    Éditer
                  </Link>
                  <form action={deletePageAction} className="inline">
                    <input type="hidden" name="id" value={page.id} />
                    <FormSubmitButton variant="outline" size="sm" pendingLabel="Suppression...">
                      Supprimer
                    </FormSubmitButton>
                  </form>
                </td>
              </tr>
            ))}
            {pages.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-muted-foreground">
                  Aucune page pour le moment.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </article>
    </section>
  );
}
