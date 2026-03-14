import { Users } from "lucide-react";

export default function AdminUsersPage() {
  return (
    <section className="space-y-4">
      <header className="rounded-lg border border-border bg-card p-5 text-card-foreground">
        <div className="flex items-center gap-3">
          <Users className="size-5" aria-hidden="true" />
          <h1 className="text-lg font-semibold">Utilisateurs</h1>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Gérez ici les utilisateurs et leurs accès à l&apos;espace d&apos;administration.
        </p>
      </header>
    </section>
  );
}
