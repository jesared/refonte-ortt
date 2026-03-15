import { LoginButton } from "@/components/login-button";

export default function AdminLoginPage() {
  return (
    <section className="mx-auto max-w-xl p-6">
      <h1 className="text-xl font-semibold">Connexion administrateur</h1>

      <p className="text-sm text-muted-foreground">
        Connectez-vous avec Google pour accéder à l’espace administrateur.
      </p>

      <LoginButton label="Se connecter avec Google" />
    </section>
  );
}
