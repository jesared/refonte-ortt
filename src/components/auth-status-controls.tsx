"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";

export function AuthStatusControls() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const callbackUrl = "/admin";
      const result = await signIn("google", {
        callbackUrl,
        redirect: false,
      });

      if (result?.url) {
        router.push(result.url);
      } else {
        router.push(callbackUrl);
      }

      router.refresh();
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

  return (
    <Button asChild type="button" size="sm" variant="outline">
      <Link href="/admin">Admin</Link>
    </Button>
  );
}
