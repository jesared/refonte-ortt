import type { ReactNode } from "react";

import { redirect } from "next/navigation";

import { auth } from "@/auth";

export default async function UserLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/auth/admin");
  }

  return <>{children}</>;
}
