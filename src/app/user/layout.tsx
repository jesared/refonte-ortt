import type { ReactNode } from "react";

import { redirect } from "next/navigation";

import { auth } from "@/auth";

export default async function UserLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/admin");
  }

  if (session.user.role === "ADMIN") {
    redirect("/admin");
  }

  return <>{children}</>;
}
