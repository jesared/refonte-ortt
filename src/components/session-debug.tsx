"use client";

import { useSession } from "next-auth/react";

export function SessionDebug() {
  const { data: session, status } = useSession();

  return <pre>{JSON.stringify({ session, status }, null, 2)}</pre>;
}
