export type AdminSidebarSession = {
  user?: {
    email?: string | null;
    role?: string | null;
  };
} | null;
