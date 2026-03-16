"use client";

import { Role } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/get-initials";

type UserRow = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: Role;
};

type UsersTableProps = {
  users: UserRow[];
};

const roleBadgeClassMap: Record<Role, string> = {
  ADMIN: "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-200",
  EDITOR: "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-200",
  USER: "bg-muted text-muted-foreground",
};

export function UsersTable({ users }: UsersTableProps) {
  const router = useRouter();
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleRoleChange = async (userId: string, role: Role) => {
    setUpdatingUserId(userId);

    try {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
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
      setUpdatingUserId(null);
    }
  };

  return (
    <>
      {toastMessage ? (
        <div className="fixed bottom-4 right-4 z-50 rounded-md border border-border bg-background px-4 py-2 text-sm shadow-lg">
          {toastMessage}
        </div>
      ) : null}

      <div className="overflow-x-auto rounded-lg border border-border bg-card text-card-foreground">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/40 text-left text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Utilisateur</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Rôle</th>
              <th className="px-4 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-border last:border-b-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9">
                      {user.image ? <AvatarImage src={user.image} alt={user.name ?? user.email} /> : null}
                      <AvatarFallback>{getInitials(user.name ?? user.email)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name ?? "Sans nom"}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${roleBadgeClassMap[user.role]}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <select
                    className="rounded-md border border-input bg-background px-2 py-1 text-sm"
                    defaultValue={user.role}
                    disabled={updatingUserId === user.id}
                    onChange={(event) => handleRoleChange(user.id, event.target.value as Role)}
                  >
                    <option value="USER">USER</option>
                    <option value="EDITOR">EDITOR</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
