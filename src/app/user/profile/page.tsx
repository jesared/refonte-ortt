import { auth } from "@/auth";

export default async function UserProfilePage() {
  const session = await auth();

  return (
    <section className="max-w-2xl space-y-6 rounded-xl border border-border bg-card p-6">
      <header>
        <h2 className="text-lg font-semibold text-card-foreground">Mon profil</h2>
        <p className="text-sm text-muted-foreground">Consultez les informations associées à votre compte.</p>
      </header>

      <dl className="grid gap-4 text-sm sm:grid-cols-[180px_1fr]">
        <dt className="font-medium text-muted-foreground">Nom</dt>
        <dd className="font-medium text-card-foreground">{session?.user?.name ?? "Non renseigné"}</dd>

        <dt className="font-medium text-muted-foreground">Email</dt>
        <dd className="font-medium text-card-foreground">{session?.user?.email ?? "Non renseigné"}</dd>

        <dt className="font-medium text-muted-foreground">Rôle</dt>
        <dd className="font-medium text-card-foreground">{session?.user?.role ?? "USER"}</dd>
      </dl>
    </section>
  );
}
