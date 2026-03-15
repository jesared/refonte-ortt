import Link from "next/link";

import { LoginButton } from "@/components/login-button";

export default function AdminLoginPage() {
  return (
    <section className="mx-auto max-w-xl space-y-4 rounded-lg border border-border bg-card p-6 text-card-foreground">
      <h1 className="text-xl font-semibold">Connexion administrateur</h1>

      <div className="flex flex-wrap gap-3">
        <LoginButton label="Se connecter avec Google" />

        <Link
          href="/"
          className="text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  );
}
