"use server";

import { addSociety, updateSociety } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createSocietyAction(formData: FormData) {
  const newSoc = {
    name: formData.get("name") as string,
    abbr: (formData.get("abbr") as string).toUpperCase(),
    accentColor: formData.get("accentColor") as string,
    description: formData.get("description") as string,
  };

  await addSociety(newSoc);

  revalidatePath("/admin/societies");
  revalidatePath("/societies");
  redirect("/admin/societies?success=Society+created+successfully");
}

export async function updateSocietyAction(abbr: string, formData: FormData) {
  const updatedSoc = {
    name: formData.get("name") as string,
    abbr: (formData.get("abbr") as string).toUpperCase(),
    accentColor: formData.get("accentColor") as string,
    description: formData.get("description") as string,
  };

  await updateSociety(abbr, updatedSoc);

  revalidatePath("/admin/societies");
  revalidatePath("/societies");
  redirect("/admin/societies?success=Society+updated+successfully");
}
