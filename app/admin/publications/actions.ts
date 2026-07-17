"use server";

import { addPublication, updatePublication } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPublicationAction(formData: FormData, imageUrl: string) {
  const newPub = {
    title: formData.get("title") as string,
    authors: formData.get("authors") as string,
    venue: formData.get("venue") as string,
    year: formData.get("year") as string,
    type: formData.get("type") as string,
    abstract: formData.get("abstract") as string,
    link: formData.get("link") as string || "#",
    color: formData.get("color") as string || "var(--color-ibm-blue)",
    imageUrl: imageUrl,
  };

  await addPublication(newPub);
  
  revalidatePath("/admin/publications");
  revalidatePath("/publications");
  redirect("/admin/publications?success=Publication+created+successfully");
}

export async function updatePublicationAction(id: number, formData: FormData, imageUrl: string) {
  const updatedPub = {
    title: formData.get("title") as string,
    authors: formData.get("authors") as string,
    venue: formData.get("venue") as string,
    year: formData.get("year") as string,
    type: formData.get("type") as string,
    abstract: formData.get("abstract") as string,
    link: formData.get("link") as string || "#",
    color: formData.get("color") as string || "var(--color-ibm-blue)",
    ...(imageUrl ? { imageUrl } : {}),
  };

  await updatePublication(id, updatedPub);
  
  revalidatePath("/admin/publications");
  revalidatePath("/publications");
  redirect("/admin/publications?success=Publication+updated+successfully");
}
