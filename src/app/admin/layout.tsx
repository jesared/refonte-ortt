import type { ReactNode } from "react";

import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/admin");
  }

  if (session.user.role?.toLowerCase() !== "admin") {
    redirect("/user");
  }

  return <AdminShell>{children}</AdminShell>;
}
