import { auth } from "@/auth";

export default async function AdminProfilePage() {
  const session = await auth();

  return (
    <section className="space-y-4">
      <article className="rounded-lg border border-border bg-card p-5 text-card-foreground">
        <h1 className="text-lg font-semibold">Profil</h1>
        <p className="mt-1 text-sm text-muted-foreground">Informations du compte actuellement connecté.</p>

        <dl className="mt-4 space-y-2 text-sm">
          <div>
            <dt className="text-muted-foreground">Nom</dt>
            <dd className="font-medium">{session?.user?.name ?? "Non renseigné"}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Email</dt>
            <dd className="font-medium">{session?.user?.email ?? "Non renseigné"}</dd>
          </div>
        </dl>
      </article>
    </section>
  );
}
