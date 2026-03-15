import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { LoginButton } from "@/components/login-button";

const ERROR_MESSAGES: Record<string, string> = {
  auth_required:
    "Vous devez vous connecter avec Google pour accéder à l'administration.",
  forbidden:
    "Votre compte Google n'est pas autorisé à accéder à l'administration.",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const session = await auth();

  if (session?.user) {
    redirect(session.user.role?.toLowerCase() === "admin" ? "/admin" : "/user");
  }

  const errorMessage = searchParams.error
    ? ERROR_MESSAGES[searchParams.error]
    : null;

  return (
    <section className="mx-auto max-w-xl space-y-4 rounded-lg border border-border bg-card p-6 text-card-foreground">
      <h1 className="text-xl font-semibold">Connexion administrateur</h1>

      <p className="text-sm text-muted-foreground">
        Connectez-vous avec un compte Google autorisé pour accéder à
        l&apos;espace admin.
      </p>

      {errorMessage && (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {errorMessage}
        </p>
      )}

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
