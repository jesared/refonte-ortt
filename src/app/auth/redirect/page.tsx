import { redirect } from "next/navigation";

import { auth } from "@/auth";

export default async function AuthRedirectPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  if (session.user.role === "ADMIN") {
    redirect("/admin");
  }

  redirect("/user");
}
