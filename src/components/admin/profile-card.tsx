"use client";

import { LogIn, LogOut } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function getInitials(name?: string | null, email?: string | null) {
  const base = name?.trim() || email?.trim() || "Utilisateur";
  return base
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function ProfileCard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Card className="border border-border bg-card p-4 text-foreground">
        <p className="text-sm text-muted-foreground">Chargement du profil...</p>
      </Card>
    );
  }

  if (!session?.user) {
    return (
      <Card className="border border-border bg-card p-4 text-foreground">
        <p className="mb-3 text-sm text-muted-foreground">Connectez-vous pour accéder à votre profil.</p>
        <Button type="button" variant="outline" className="w-full" onClick={() => signIn()}>
          <LogIn className="size-4" aria-hidden="true" />
          Se connecter
        </Button>
      </Card>
    );
  }

  const { user } = session;
  const roleLabel = user.role === "ADMIN" ? "Administrateur" : user.role === "EDITOR" ? "Éditeur" : "Utilisateur";

  return (
    <Card className="space-y-4 border border-border bg-card p-4 text-foreground">
      <div className="flex items-center gap-3">
        <Avatar>
          {user.image ? <AvatarImage src={user.image} alt={user.name ?? "Photo de profil"} /> : null}
          <AvatarFallback>{getInitials(user.name, user.email)}</AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{user.name ?? "Utilisateur"}</p>
          <p className="truncate text-xs text-muted-foreground">{user.email ?? "Email non disponible"}</p>
          <p className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">{roleLabel}</p>
        </div>
      </div>

      <Button type="button" variant="outline" className="w-full" onClick={() => signOut()}>
        <LogOut className="size-4" aria-hidden="true" />
        Se déconnecter
      </Button>
    </Card>
  );
}
