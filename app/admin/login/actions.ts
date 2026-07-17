"use server";

import { login } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function handleLoginAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const success = await login(username, password);

  if (success) {
    redirect("/admin");
  } else {
    redirect("/admin/login?error=Invalid username or password");
  }
}
