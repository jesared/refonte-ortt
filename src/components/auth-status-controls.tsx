"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";

export function AuthStatusControls() {
  const { data: session, status } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await signIn("google", {
        callbackUrl: "/admin",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return (
      <Button type="button" size="sm" variant="outline" disabled>
        Chargement...
      </Button>
    );
  }

  if (!session) {
    return (
      <Button type="button" size="sm" onClick={handleLogin} disabled={isSubmitting}>
        {isSubmitting ? "Connexion..." : "Connexion"}
      </Button>
    );
  }

  return null;
}
