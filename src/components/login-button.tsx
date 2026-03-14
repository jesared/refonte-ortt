"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

export function LoginButton() {
  return (
    <Button type="button" onClick={() => signIn("google")}>
      Connexion administrateur
    </Button>
  );
}
