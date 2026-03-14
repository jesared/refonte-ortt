"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { AdminHeader } from "@/components/admin/admin-header";
import { Sidebar } from "@/components/admin/sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />

      <div className="min-w-0 flex-1">
        <AdminHeader title="Dashboard" onMenuClick={() => setMobileOpen(true)} />
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
