import Link from "next/link";
import { notFound } from "next/navigation";

import { updatePageAction } from "@/app/admin/actions";
import { FormSubmitButton } from "@/components/admin/form-submit-button";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { getPage } from "@/lib/cms-store";

export default async function AdminPageEdition({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await getPage(id);

  if (!page) {
    notFound();
  }

  return (
    <section className="space-y-6">
      <Link href="/admin/pages" className="text-sm text-muted-foreground hover:text-foreground">
        ← Retour à la liste
      </Link>

      <article className="rounded-lg border border-border bg-card p-5">
        <h2 className="text-lg font-semibold text-foreground">Modifier la page</h2>

        <form action={updatePageAction} className="mt-4 space-y-4">
          <input type="hidden" name="id" value={page.id} />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="title">
                Titre
              </label>
              <input
                id="title"
                name="title"
                defaultValue={page.title}
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
                defaultValue={page.slug}
                required
                className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground"
              />
            </div>
          </div>

          <RichTextEditor name="content" label="Contenu" defaultValue={page.content} />

          <FormSubmitButton>Sauvegarder</FormSubmitButton>
        </form>
      </article>
    </section>
  );
}
