"use client";

import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";

type LoginButtonProps = {
  label?: string;
  disabled?: boolean;
};

export function LoginButton({
  label = "Connexion administrateur",
  disabled = false,
}: LoginButtonProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Button type="button" disabled>
        Chargement...
      </Button>
    );
  }

  if (session?.user) {
    return null;
  }

  return (
    <Button
      type="button"
      disabled={disabled}
      onClick={() =>
        signIn("google", {
          callbackUrl: "/admin",
        })
      }
    >
      {label}
    </Button>
  );
}
