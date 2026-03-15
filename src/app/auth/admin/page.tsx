import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { LoginButton } from "@/components/login-button";

const ERROR_MESSAGES: Record<string, string> = {
  auth_required: "Vous devez vous connecter avec Google pour accéder à l'administration.",
  forbidden:
    "Votre compte Google n'est pas autorisé à accéder à l'administration.",
  Configuration:
    "La connexion Google n'est pas configurée côté serveur. Vérifiez AUTH_GOOGLE_ID/AUTH_GOOGLE_SECRET (ou GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET) dans l'environnement de déploiement.",
  configuration:
    "La connexion Google n'est pas configurée côté serveur. Vérifiez AUTH_GOOGLE_ID/AUTH_GOOGLE_SECRET (ou GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET) dans l'environnement de déploiement.",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
}) {
  const session = await auth();

  if (session?.user) {
    redirect(session.user.role === "ADMIN" ? "/admin" : "/user");
  }

  const params = await searchParams;
  const isGoogleConfigured = Boolean(
    process.env.AUTH_GOOGLE_ID ?? process.env.GOOGLE_CLIENT_ID,
  ) &&
    Boolean(process.env.AUTH_GOOGLE_SECRET ?? process.env.GOOGLE_CLIENT_SECRET);
  const errorMessage = params.error ? ERROR_MESSAGES[params.error] : null;
  const callbackUrl = params.callbackUrl ?? "/auth/redirect";

  return (
    <section className="mx-auto max-w-xl space-y-4 rounded-lg border border-border bg-card p-6 text-card-foreground">
      <h1 className="text-xl font-semibold">Connexion administrateur</h1>
      <p className="text-sm text-muted-foreground">
        Connectez-vous avec un compte Google autorisé pour accéder à l&apos;espace admin.
      </p>

      {errorMessage ? (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {errorMessage}
        </p>
      ) : null}

      {!isGoogleConfigured ? (
        <p className="rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-700 dark:text-amber-300">
          La connexion Google est désactivée car les variables d&apos;environnement ne sont pas configurées. Définissez AUTH_GOOGLE_ID + AUTH_GOOGLE_SECRET (ou GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET) puis redéployez le serveur.
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <LoginButton
          callbackUrl={callbackUrl}
          label="Se connecter avec Google"
          disabled={!isGoogleConfigured}
        />
        <Link href="/" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  );
}
