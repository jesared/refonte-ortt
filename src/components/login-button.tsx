"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export function LoginButton({
  label = "Se connecter avec Google",
}: {
  label?: string;
}) {
  return (
    <Button
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/admin" })}
    >
      {label}
    </Button>
  );
}
