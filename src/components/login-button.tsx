"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";

type LoginButtonProps = {
  callbackUrl?: string;
  label?: string;
  disabled?: boolean;
};

export function LoginButton({
  callbackUrl,
  label = "Connexion administrateur",
  disabled = false,
}: LoginButtonProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (isLoading || disabled) return;

    setIsLoading(true);

    try {
      const redirectTo = callbackUrl ?? "/auth/redirect";
      const result = await signIn("google", {
        callbackUrl: redirectTo,
        redirect: false,
      });

      if (result?.url) {
        router.push(result.url);
      } else {
        router.push(redirectTo);
      }

      router.refresh();
    } finally {
      setIsLoading(false);
    }
  };

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
    <Button type="button" onClick={handleLogin} disabled={isLoading || disabled}>
      {isLoading ? "Connexion..." : label}
    </Button>
  );
}
