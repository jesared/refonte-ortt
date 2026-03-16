import type { ReactNode } from "react";

import { auth } from "@/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { redirect } from "next/navigation";

type AdminLayoutProps = {
  children: ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/admin");
  }

  const role = session.user.role ?? "USER";

  if (role !== "ADMIN") {
    redirect("/user");
  }

  return <AdminShell>{children}</AdminShell>;
}
