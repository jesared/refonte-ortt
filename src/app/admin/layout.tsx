import type { ReactNode } from "react"

import { auth } from "@/auth"
import { redirect } from "next/navigation"

type AdminLayoutProps = {
  children: ReactNode
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await auth()

  if (!session?.user) {
    redirect("/auth/admin")
  }

  if (session.user.role !== "ADMIN") {
    redirect("/user")
  }

  return children
}
