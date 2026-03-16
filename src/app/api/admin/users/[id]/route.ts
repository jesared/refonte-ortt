import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function DELETE(_request: Request, { params }: RouteParams) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return new Response("Unauthorized", { status: 403 });
  }

  const { id } = await params;

  if (session.user.id === id) {
    return NextResponse.json({ error: "Cannot delete current user" }, { status: 400 });
  }

  await prisma.user.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
