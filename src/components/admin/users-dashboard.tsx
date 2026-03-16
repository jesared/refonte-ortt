"use client";

import { Role } from "@prisma/client";
import { Menu, Search, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type UserRow = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: Role;
  createdAt: Date;
};

type UsersDashboardProps = {
  users: UserRow[];
  page: number;
  totalPages: number;
  search: string;
  role: "ALL" | Role;
};

const roleStyles: Record<Role, string> = {
  ADMIN: "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-200",
  EDITOR: "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-200",
  USER: "bg-muted text-muted-foreground",
};

export function UsersDashboard({ users, page, totalPages, search, role }: UsersDashboardProps) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(search);
  const [filterRole, setFilterRole] = useState<"ALL" | Role>(role);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2400);
  };

  const queryHref = (nextPage: number, nextSearch = searchValue, nextRole = filterRole) => {
    const params = new URLSearchParams();
    if (nextSearch.trim()) params.set("search", nextSearch.trim());
    if (nextRole !== "ALL") params.set("role", nextRole);
    params.set("page", String(nextPage));
    return `/admin/users?${params.toString()}`;
  };

  const applyFilters = () => {
    startTransition(() => {
      router.push(queryHref(1));
    });
  };

  const handleRoleChange = async (userId: string, nextRole: Role) => {
    setPendingUserId(userId);

    try {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: nextRole }),
      });

      if (!response.ok) {
        showToast("Impossible de mettre à jour le rôle");
        return;
      }

      showToast("Rôle mis à jour");
      router.refresh();
    } catch {
      showToast("Erreur réseau pendant la mise à jour");
    } finally {
      setPendingUserId(null);
    }
  };

  const handleDelete = async (userId: string) => {
    setPendingUserId(userId);

    try {
      const response = await fetch(`/api/admin/users/${userId}`, { method: "DELETE" });

      if (!response.ok) {
        showToast("Suppression impossible");
        return;
      }

      showToast("Utilisateur supprimé");
      router.refresh();
    } catch {
      showToast("Erreur réseau pendant la suppression");
    } finally {
      setPendingUserId(null);
    }
  };

  const paginationItems = useMemo(() => {
    const items: number[] = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, start + 4);
    for (let current = start; current <= end; current += 1) items.push(current);
    return items;
  }, [page, totalPages]);

  return (
    <Card>
      <div className="flex flex-col gap-4 border-b p-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-xl font-semibold">Utilisateurs</h1>
          <p className="text-sm text-muted-foreground">Gérez les accès et permissions de la plateforme.</p>
        </div>
        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
          <div className="relative min-w-72">
            <Search className="pointer-events-none absolute left-3 top-3.5 size-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Rechercher un utilisateur..."
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") applyFilters();
              }}
            />
          </div>
          <Select value={filterRole} onChange={(event) => setFilterRole(event.target.value as "ALL" | Role)}>
            <option value="ALL">Tous</option>
            <option value="ADMIN">Admin</option>
            <option value="EDITOR">Editor</option>
            <option value="USER">User</option>
          </Select>
          <Button variant="outline" onClick={applyFilters} disabled={isPending}>
            Filtrer
          </Button>
        </div>
      </div>

      <CardContent className="space-y-4 pt-6">
        {toastMessage ? (
          <div className="fixed bottom-4 right-4 z-50 rounded-md border bg-background px-4 py-2 text-sm shadow-lg">{toastMessage}</div>
        ) : null}

        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Avatar</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Créé le</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.image ?? ""} alt={user.name ?? user.email} />
                      <AvatarFallback>{user.name?.slice(0, 1) ?? "U"}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{user.name ?? "Sans nom"}</TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge className={roleStyles[user.role]}>{user.role}</Badge>
                      <Select
                        className="h-8 w-28"
                        defaultValue={user.role}
                        disabled={pendingUserId === user.id}
                        onChange={(event) => handleRoleChange(user.id, event.target.value as Role)}
                      >
                        <option value="USER">USER</option>
                        <option value="EDITOR">EDITOR</option>
                        <option value="ADMIN">ADMIN</option>
                      </Select>
                    </div>
                  </TableCell>
                  <TableCell>{new Intl.DateTimeFormat("fr-FR").format(new Date(user.createdAt))}</TableCell>
                  <TableCell className="text-right">
                    <div className="relative inline-block">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex size-8 items-center justify-center rounded-md border hover:bg-muted">
                          <Menu className="size-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem className="gap-2" disabled>
                            <Shield className="size-4" />
                            Modifier rôle
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                            disabled={pendingUserId === user.id}
                            onClick={() => handleDelete(user.id)}
                          >
                            Supprimer utilisateur
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink href={queryHref(Math.max(1, page - 1))}>Précédent</PaginationLink>
            </PaginationItem>
            {paginationItems.map((currentPage) => (
              <PaginationItem key={currentPage}>
                <PaginationLink href={queryHref(currentPage)} isActive={currentPage === page}>
                  {currentPage}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationLink href={queryHref(Math.min(totalPages, page + 1))}>Suivant</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  );
}
