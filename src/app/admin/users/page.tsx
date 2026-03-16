import { Role } from "@prisma/client";

import { UsersDashboard } from "@/components/admin/users-dashboard";
import { prisma } from "@/lib/prisma";

const PAGE_SIZE = 10;

type SearchParams = Promise<{ page?: string; search?: string; role?: string }>;

type AdminUsersPageProps = {
  searchParams: SearchParams;
};

export default async function AdminUsersPage({ searchParams }: AdminUsersPageProps) {
  const params = await searchParams;
  const page = Number(params.page ?? "1");
  const normalizedPage = Number.isNaN(page) || page < 1 ? 1 : page;
  const search = params.search?.trim() ?? "";
  const requestedRole = params.role ?? "ALL";
  const role = requestedRole === "ALL" || !Object.values(Role).includes(requestedRole as Role) ? "ALL" : (requestedRole as Role);

  const where = {
    ...(role !== "ALL" ? { role } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { email: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [users, totalUsers] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: PAGE_SIZE,
      skip: (normalizedPage - 1) * PAGE_SIZE,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
      },
    }),
    prisma.user.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalUsers / PAGE_SIZE));

  return <UsersDashboard users={users} page={normalizedPage} totalPages={totalPages} search={search} role={role} />;
}
