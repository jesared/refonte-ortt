import type { ReactNode } from "react";

import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { UserShell } from "@/components/user/user-shell";

export default async function UserLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/auth/admin");
  }

  return <UserShell>{children}</UserShell>;
}
