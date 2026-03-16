import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: RouteParams) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return new Response("Unauthorized", { status: 403 });
  }

  const { id } = await params;
  const body = (await request.json()) as { role?: Role };

  if (!body.role || !Object.values(Role).includes(body.role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id },
    data: { role: body.role },
  });

  return NextResponse.json({ success: true });
}
