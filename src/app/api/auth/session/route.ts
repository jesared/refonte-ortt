import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(null);
  }

  return NextResponse.json({
    user: {
      email: session.user.email,
      role: session.user.role,
    },
  });
}
