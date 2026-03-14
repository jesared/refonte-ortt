"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

type LoginButtonProps = {
  callbackUrl?: string;
  label?: string;
};

export function LoginButton({ callbackUrl, label = "Connexion administrateur" }: LoginButtonProps) {
  return (
    <Button type="button" onClick={() => signIn("google", { callbackUrl })}>
      {label}
    </Button>
  );
}
