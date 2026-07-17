import React from "react";
import { headers } from "next/headers";
import { AdminSidebar } from "./AdminSidebar";

import { AdminToast } from "@/components/admin-toast";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") || "";

  // If the path is login, don't show the dashboard shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-bg-secondary flex flex-col md:flex-row relative">
      <AdminSidebar />
      <AdminToast />

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-bg-primary md:border-l border-border h-[calc(100vh-73px)] md:h-screen">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
