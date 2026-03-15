import { auth } from "@/auth";

export default async function UserHomePage() {
  const session = await auth();

  return (
    <section className="space-y-4">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold">Bienvenue dans votre espace</h2>
        <p className="text-sm text-muted-foreground">
          Connecté avec : <span className="font-medium">{session?.user?.email ?? "email inconnu"}</span>
        </p>
      </header>
      <p className="rounded-lg border border-border bg-card p-4 text-sm text-card-foreground">
        Vous pouvez retrouver ici vos informations de compte et accéder rapidement à votre profil.
      </p>
    </section>
  );
}
