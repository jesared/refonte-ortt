"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

type LoginButtonProps = {
  callbackUrl?: string;
  label?: string;
};

export function LoginButton({ callbackUrl, label = "Connexion administrateur" }: LoginButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const redirectTo = callbackUrl ?? "/admin";
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

  return (
    <Button type="button" onClick={handleLogin} disabled={isLoading}>
      {isLoading ? "Connexion..." : label}
    </Button>
  );
}
