"use server";

import { logout } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function handleLogoutAction() {
  await logout();
  redirect("/admin/login");
}
