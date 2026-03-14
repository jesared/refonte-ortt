import { uploadMediaAction } from "@/app/admin/actions";
import { FormSubmitButton } from "@/components/admin/form-submit-button";
import { MediaCard } from "@/components/admin/media-card";
import { listMedia } from "@/lib/cms-store";

export default async function AdminMedia() {
  const media = await listMedia();

  return (
    <section className="space-y-6">
      <article className="rounded-lg border border-border bg-card p-5">
        <h2 className="text-lg font-semibold text-foreground">Bibliothèque média</h2>
        <p className="mt-1 text-sm text-muted-foreground">Ajoutez une image puis réutilisez son URL dans vos pages et actualités.</p>

        <form action={uploadMediaAction} className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
          <input
            type="file"
            name="image"
            accept="image/*"
            required
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground md:max-w-md"
          />
          <FormSubmitButton>Téléverser</FormSubmitButton>
        </form>
      </article>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {media.map((item) => (
          <MediaCard key={item.id} {...item} />
        ))}
        {media.length === 0 ? (
          <p className="rounded-lg border border-border bg-card p-10 text-center text-sm text-muted-foreground sm:col-span-2 xl:col-span-4">
            Aucune image téléversée.
          </p>
        ) : null}
      </div>
    </section>
  );
}
